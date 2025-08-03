const User = require("../../models/users");
const Submission = require("../../models/submissions");

// Get previous date in UTC
function getPreviousDate(dateStr, daysBack = 1) {
  const date = new Date(dateStr + "T00:00:00Z");
  date.setUTCDate(date.getUTCDate() - daysBack);
  return date.toISOString().split('T')[0];
}

// Get next date in UTC
function getNextDate(dateStr, daysAhead = 1) {
  const date = new Date(dateStr + "T00:00:00Z");
  date.setUTCDate(date.getUTCDate() + daysAhead);
  return date.toISOString().split('T')[0];
}

// Compare two UTC date strings (YYYY-MM-DD)
function compareDates(dateStr1, dateStr2) {
  if (dateStr1 < dateStr2) return -1;
  if (dateStr1 > dateStr2) return 1;
  return 0;
}

// Group submission stats by UTC calendar day
const getDailyActivityData = (submissions, startDate, endDate) => {
  const activityData = [];
  let count = 0, acceptedCount = 0, errorCount = 0, pendingCount = 0, wrongAnswerCount = 0;
  const totalSubmissions = submissions.length;

  let i = 0;
  while (i < totalSubmissions) {
    const submitDate = submissions[i].createdAt.toISOString().split('T')[0];
    if (compareDates(startDate, submitDate) === 0) {
      switch (submissions[i].status) {
        case "accepted": acceptedCount++; break;
        case "wrong-answer": wrongAnswerCount++; break;
        case "pending": pendingCount++; break;
        default: errorCount++;
      }
      count++;
      i++;
      continue;
    }

    activityData.push({
      date: startDate,
      count,
      acceptedCount,
      wrongAnswerCount,
      pendingCount,
      errorCount
    });

    startDate = getNextDate(startDate);
    count = acceptedCount = errorCount = pendingCount = wrongAnswerCount = 0;
  }

  activityData.push({
    date: startDate,
    count,
    acceptedCount,
    wrongAnswerCount,
    pendingCount,
    errorCount
  });
  startDate = getNextDate(startDate);

  while (compareDates(startDate, endDate) < 0) {
    activityData.push({
      date: startDate,
      count: 0,
      acceptedCount: 0,
      wrongAnswerCount: 0,
      pendingCount: 0,
      errorCount: 0
    });
    startDate = getNextDate(startDate);
  }

  return activityData;
}

// Main controller
const getDailyActivityInfo = async (req, res) => {
  const { user } = req;

  try {
    const page = Number(req.query.page) || 1;
    if (page < 1) {
      return res.status(400).json({ error: "Page must be >= 1" });
    }

    // Get today's UTC midnight
    const now = new Date();
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    
    // Calculate windowEnd and windowStart in UTC
    const windowEnd = new Date(todayUTC);
    windowEnd.setUTCDate(todayUTC.getUTCDate() + 1 - (14 * (page - 1))); // exclusive

    const windowStart = new Date(windowEnd);
    windowStart.setUTCDate(windowEnd.getUTCDate() - 14);

    const endDate = windowEnd.toISOString().split('T')[0];
    let startDate = windowStart.toISOString().split('T')[0];
    const userJoinedDate = user.createdAt.toISOString().split('T')[0];

    if(compareDates(endDate, userJoinedDate) <= 0)
      return res.status(400).json({ error: "Page limit exceeded" });

    if(compareDates(startDate, userJoinedDate) < 0) 
      startDate = userJoinedDate;

    // Fetch submissions in UTC window
    const submissions = await Submission.find({
      userId: user._id,
      createdAt: {
        $gte: windowStart,
        $lt: windowEnd
      }
    })
    .sort({ createdAt: 1 })
    .select("createdAt status");

    const dailyActivityData = getDailyActivityData(submissions, startDate, endDate);

    return res.status(200).json(dailyActivityData);

  } catch (error) {
    console.error(error);
    return res.status(500).send("Error: " + error.message);
  }
};

module.exports = getDailyActivityInfo;
