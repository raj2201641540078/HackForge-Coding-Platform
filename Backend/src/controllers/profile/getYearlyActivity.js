const Submission = require("../../models/submissions");
const { compareDates, summarizeSubmissionsByDate } = require("../../utils/utils");

// Main controller
const getYearlyActivity = async (req, res) => {
  const { user } = req;

  try {
    const page = Number(req.query.page) || 1;
    if (page < 1) {
      return res.status(400).json({ error: "Page must be >= 1" });
    }

    // Get today's UTC midnight
    const now = new Date();
    const currentYear = now.getUTCFullYear();

    // Calculate the target year based on page
    const targetYear = currentYear - (page - 1);

    // Define windowStart and windowEnd in UTC
    const windowStart = new Date(Date.UTC(targetYear, 0, 1)); // Jan 1st, 00:00 of target year
    const windowEnd = new Date(Date.UTC(targetYear + 1, 0, 1)); // Jan 1st of next year

    const endDate = windowEnd.toISOString().split('T')[0];
    const startDate = windowStart.toISOString().split('T')[0];
    const userJoinedDate = user.createdAt.toISOString().split('T')[0];

    if(compareDates(endDate, userJoinedDate) <= 0)
      return res.status(400).json({ error: "Page limit exceeded" });

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

    const yearlyActivity = summarizeSubmissionsByDate(submissions);
    const dataToSend = {
        startDate,
        endDate,
        yearlyActivity
    }
    
    return res.status(200).json(dataToSend);

  } catch (error) {
    console.error(error);
    return res.status(500).send("Error: " + error.message);
  }
};

module.exports = getYearlyActivity;