export const getMappedStatus = (status) => {
  switch (status) {
      case 'accepted':
        return "Accepted";
      case 'wrong-answer':
        return `Wrong Answer`;
      case 'runtime-error':
        return `Runtime Error`;
      case 'compilation-error':
        return `Compilation Error`;
      case 'pending':
        return `Pending`;
      case 'tle':
        return `Time Limit Exceeded`;
      default:
        return `Error`;
    }
}

export const getMappedLanguage = (language) => {
  switch (language) {
      case 'cpp':
        return "C++";
      case 'java':
        return `Java`;
      case 'javascript':
        return `Javascript`;
      case 'python':
        return `Python`;
      case 'c':
        return `C`;
      default:
        return `N/A`;
    }
}

export const getInclusiveDayDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Get the difference in time (milliseconds)
  const diffTime = Math.abs(d2 - d1);

  // Convert to days and add 1 to include both start and end dates
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return diffDays;
}

export function summarizeSubmissionsByDate(submissions) {
  const summaryMap = {};

  for (const item of submissions) {
    if (!item.isSolved) continue; // ✅ Skip unsolved items

    const date = new Date(item.submitDate).toISOString().split('T')[0];
    const difficulty = item.pid.difficulty.toLowerCase(); // Normalize difficulty string

    if (!summaryMap[date]) {
      summaryMap[date] = {
        date,
        count: 0,
        basicCount: 0,
        easyCount: 0,
        mediumCount: 0,
        hardCount: 0,
      };
    }

    summaryMap[date].count++;
    if (difficulty === 'basic') summaryMap[date].basicCount++;
    else if (difficulty === 'easy') summaryMap[date].easyCount++;
    else if (difficulty === 'medium') summaryMap[date].mediumCount++;
    else if (difficulty === 'hard') summaryMap[date].hardCount++;
  }

  return Object.values(summaryMap).sort((a, b) => a.date.localeCompare(b.date));
}

export function filterProblemsByDateRange(summaryArray, startDate, endDate) {
  const result = [];
  const summaryMap = {};

  // Convert summaryArray into a map for quick lookup
  for (const entry of summaryArray) {
    summaryMap[entry.date] = entry;
  }

  // Convert strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Loop from start to end date
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    if (summaryMap[dateStr]) {
      result.push(summaryMap[dateStr]);
    } else {
      result.push({
        date: dateStr,
        count: 0,
        basicCount: 0,
        easyCount: 0,
        mediumCount: 0,
        hardCount: 0,
      });
    }
  }

  return result;
}

export function filterSubmissionsByDateRange(summaryArray, startDate, endDate) {
  const result = [];
  const summaryMap = {};

  // Convert summaryArray into a map for quick lookup
  for (const entry of summaryArray) {
    summaryMap[entry.date] = entry;
  }

  // Convert strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Loop from start to end date
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    if (summaryMap[dateStr]) {
      result.push(summaryMap[dateStr]);
    } else {
      result.push({
        date: dateStr,
        count: 0,
        acceptedCount: 0,
        runtimeErrorCount: 0,
        compilationErrorCount: 0,
        wrongAnswerCount: 0,
        tleCount: 0,
        pendingCount: 0
      });
    }
  }

  return result;
}

// Compare two UTC date strings (YYYY-MM-DD)
export function compareDates(dateStr1, dateStr2) {
  if (dateStr1 < dateStr2) return -1;
  if (dateStr1 > dateStr2) return 1;
  return 0;
}

// Get previous date in UTC
export const getPreviousDate =  (dateStr, daysBack = 1) => {
    const date = new Date(dateStr + "T00:00:00Z");
    date.setUTCDate(date.getUTCDate() - daysBack);
    return date.toISOString().split('T')[0];
}

// Get next date in UTC
export const getNextDate = (dateStr, daysAhead = 1) => {
    const date = new Date(dateStr + "T00:00:00Z");
    date.setUTCDate(date.getUTCDate() + daysAhead);
    return date.toISOString().split('T')[0];
}

export const getStartAndLastDate = (page, limit) => {
    const now = new Date();
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));  
    // Calculate windowEnd and windowStart in UTC
    const windowEnd = new Date(todayUTC);
    windowEnd.setUTCDate(todayUTC.getUTCDate() - (limit * (page - 1))); // exclusive
    const windowStart = new Date(windowEnd);
    windowStart.setUTCDate(windowEnd.getUTCDate() - limit);
    const lastDate = windowEnd.toISOString().split('T')[0];
    let startDate = windowStart.toISOString().split('T')[0];
    
    return {startDate, lastDate};
}

export const getTotalDailyActivityPages = (joinedDate, interval) => {
  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const todayDate = todayUTC.toISOString().split('T')[0];
  const userJoinedDate = joinedDate.split('T')[0];
  const noOfDaysToJoined = getInclusiveDayDifference(todayDate, userJoinedDate);
  const noOfPages = Math.ceil(noOfDaysToJoined/interval);
  return noOfPages;
}

export const filterByKey = (data, key) => {
  return data.map((item) => {
    return {
      date: item.date,
      count: item[key] 
    }
  })
}

export const mapSubmissions = (submissions) => {
  const mappedSubmissions = submissions.map((submission) => {
      const mappedSubmission = {
        id: submission._id,
        problemId: submission.problemId._id,
        problemName: submission.problemId.title,
        date: submission.createdAt,
        status: getMappedStatus(submission.status),
        language: getMappedLanguage(submission.language),
        runtime: submission.runtime ? `${submission.runtime}ms`: 'N/A',
        memory: submission.memory ? `${submission.memory}KB`: 'N/A',
      }
      return mappedSubmission;
  });
  return mappedSubmissions;
}

export const getSolvedStats = (checkedProblems) => {
  if(!checkedProblems)
    checkedProblems = [];

  const solvedStats = {
    basic: 0, totalBasic: 0, easy: 0, totalEasy: 10, medium: 0, totalMedium: 8, hard: 0, totalHard: 7,
    total: 0, totalOverall: 25,
  };

  for (const problem of checkedProblems) {
    if(problem.isSolved) {
      const difficulty = problem.pid.difficulty.toLowerCase();
      solvedStats[difficulty]++;
      solvedStats["total"]++;
    }
  }

  return solvedStats;
}

export const mapUserInfo = (userInfo) => {
  const user = {
    id: userInfo._id,
    username: userInfo.username,
    fullName: userInfo.fullName,
    email: userInfo.emailId,
    avatarUrl: userInfo.profileImageUrl || "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg",
    joinDate: userInfo.createdAt,
    rank: `#${userInfo.rank}`,
    codingPoints: userInfo.points || 0,
    connectionsCount: userInfo.connections,
    solvedStats: getSolvedStats(userInfo.checkedProblems),
    streaks: userInfo.streaks,
    achievements: userInfo.achievements,
    skills: userInfo.skills
  }
  return user;
}

export const mapUserProfile = (userInfo) => {
  const user = {
    id: userInfo._id,
    username: userInfo.username,
    avatarUrl: userInfo.profileImageUrl || "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg",
    rank: userInfo.rank,
    codingPoints: userInfo.points || 0,
    solvedStats: getSolvedStats(userInfo.checkedProblems),
    checkedProblems: userInfo.checkedProblems || []
  }
  return user;
}

export const mapSolvedProblems = (checkedProblems) => {
  const solvedProblems = [];
  for (const problem of checkedProblems) {
    if(problem.isSolved) {
      const solvedProblem = {
        id: problem.pid._id,
        title: problem.pid.title,
        difficulty: problem.pid.difficulty,
        topics: problem.pid.tags,
        solvedDate: problem.submitDate,
      }
      solvedProblems.push(solvedProblem);
    }
  }
  return solvedProblems;
}

export const mapAllProblems = (allProblems, checkedProblems) => {
  const isProblemSolved = {};
  checkedProblems.forEach((problem) => {
    isProblemSolved[problem.pid] = problem.isSolved;
  });

  allProblems.forEach((problem) => {
    const isSolved = isProblemSolved[problem._id];
    if(isSolved === true)
      problem.status = "Solved";
    else if(isSolved == false)
      problem.status = "Attempted";
    else
      problem.status = "To Do";
  })

  return allProblems;
}

export const generateTopicOptionsWithCounts = (problems, topics) => {
  const counts = {};
  problems.forEach(problem => {
    problem.tags.forEach(topic => {
      counts[topic] = (counts[topic] || 0) + 1;
    });
  });
  return topics.map(topicValue => ({
    value: topicValue,
    label: `${topicValue} (${topicValue === 'All Tags' ? problems.length : (counts[topicValue] || 0)})`,
    count: topicValue === 'All Tags' ? problems.length : (counts[topicValue] || 0)
  }));
};

export const generateDifficultyOptionsWithCounts = (problems, difficulties) => {
  const counts = {};
  problems.forEach(problem => {
    counts[problem.difficulty] = (counts[problem.difficulty] || 0) + 1;
  });
  return difficulties.map(diffValue => ({
    value: diffValue,
    label: `${diffValue} (${diffValue === 'All Difficulties' ? problems.length : (counts[diffValue] || 0)})`,
    count: diffValue === 'All Difficulties' ? problems.length : (counts[diffValue] || 0)
  }));
};

export const generateStatusOptionsWithCounts = (problems, statuses) => {
  const counts = {
    'All Statuses': problems.length,
    'Solved': 0,
    'Attempted': 0,
    'To Do': 0,
  };
  problems.forEach(problem => {
      if (problem.status === "Solved") counts.Solved++;
      else if (problem.status === "Attempted") counts.Attempted++;
      else counts['To Do']++;
    }
  );
  return statuses.map(statusValue => ({
    value: statusValue,
    label: `${statusValue} (${counts[statusValue] !== undefined ? counts[statusValue] : 0})`,
    count: counts[statusValue] !== undefined ? counts[statusValue] : 0
  }));
};

export const deepCopy = (value) => {
  if (!value) return value;
  return JSON.parse(JSON.stringify(value));
};

export const generateMappedLeaderboard = (leaderboard, pageNo) => {

  return leaderboard.map((user, index) => {

    return({
      id: user._id,
      rank: (pageNo-1)*10 + index+1,
      username: user.username,
      avatarUrl: user.profileImageUrl || "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg",
      codingPoints: user.points || 0,
      problemsSolved: user.noSolvedProblems || 0
    });

  });
}

export const getRoutes = (section) => {
  switch(section) {
    case 'problems':
      return '/problems';
    case 'home':
      return '/';
    case 'profile':
      return '/profile/@me';
    case 'myProblems':
      return '/my-problems/all';
    case 'mySprints':
      return '/my-sprints';
    case 'submissions':
      return '/profile/my-submissions';
    case 'account':
      return '/profile/account';
    case 'logout':
      return '/logout';
    default:
      return '/';
  }
}

export const getProcessedLanguage = (language) => {
    switch (language) {
      case 'cpp': return 'C++';
      case 'c': return 'C';
      case 'javascript': return "Javascript";
      case 'java': return "Java";
      case 'python': return "Python";
      default: return language;
    }
};

// Converts ISO timestamp into human-readable format
export const getTimeStamp = (isoString) => {
    const now = new Date();
    const past = new Date(isoString);
    const diff = now.getTime() - past.getTime();

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) {
        return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;
    }
  
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
    }
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
  
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
}

export const getProcessedStatus = (status) => {
  switch (status) {
      case 'accepted': return "Accepted";
      case 'wrong-answer': return "Wrong Answer";
      case 'runtime-error': return "Runtime Error";
      case 'compilation-error': return "Compilation Error";
      case 'pending': return "Pending";
      case 'tle': return "Time Limit Exceeded";
      default: return "Runtime Error";
    }
}

export const mapSprints = (sprints, checkedProblems) => {
  const isProblemSolved = {};
  checkedProblems.forEach((problem) => {
    isProblemSolved[problem.pid] = problem.isSolved;
  });

  sprints.forEach((sprint) => 
    sprint.problems.forEach((problem) => {
      const isSolved = isProblemSolved[problem._id];
      if(isSolved === true)
        problem.status = "Solved";
      else if(isSolved === false)
        problem.status = "Attempted";
      else
        problem.status = "To Do";
    })
  );
  
  return sprints;
}


export const getMappedProblems = (data) => {
  const problemsMap = {};
  const { checkedProblems, likedProblems, favouriteProblems } = data;

  for(const problem of checkedProblems) { 
      problem.pid.isLiked = false;
      problem.pid.isFavourited = false;
      problem.pid.status = problem.isSolved ? "Solved" : "Attempted";
      problem.pid.submitDate = problem.submitDate;
      problemsMap[problem.pid._id] = problem.pid;
  }
  for(const problem of likedProblems) {
    if(problemsMap[problem._id]) {
      problemsMap[problem._id].isLiked = true;
    } else {
      problem.isLiked = true;
      problem.isFavourited = false;
      problem.status = "Todo";
      problemsMap[problem._id] = problem;
    }  
  }
  for(const problem of favouriteProblems) {
    if(problemsMap[problem._id]) {
      problemsMap[problem._id].isFavourited = true;
    } else {
      problem.isLiked = false;
      problem.isFavourited = true;
      problem.status = "Todo";
      problemsMap[problem._id] = problem;
    }  
  }

  const allProblems = Object.values(problemsMap);
  allProblems.sort((p1, p2) => p1.problemNo - p2.problemNo);

  return allProblems;
}