const User = require("../../models/users");
const Submission = require("../../models/submissions");
const mongoose = require("mongoose");

// Function to assign points based on problem difficulty
const getPoints = (difficulty) => {
  switch (difficulty) {
    case "Basic": return 1;
    case "Easy": return 2;
    case "Medium": return 4;
    case "Hard": return 8;
    default: return 0;
  }
};

const submitProblem = async (req, res) => {
  const userId = req.payload._id; // Extract user ID from token payload
  const { problemId } = req.params; // Get problem ID from route parameters
  const { submissionResult, problem } = req; // Get submission result and problem details from middleware
  const { submittedCode, language } = req.body; // Extract submitted code and language from request body

  let session;

  try {
    // Start a new MongoDB session and transaction
    session = await mongoose.startSession();
    session.startTransaction();

    // Fetch user using session
    const user = await User.findById(userId).session(session);
    if (!user) throw new Error("User not found");

    // Ensure checkedProblems array exists
    user.checkedProblems = user.checkedProblems || [];

    // Check if the user has already attempted this problem
    let problemIndex = user.checkedProblems.findIndex((prob) =>
      prob.pid.equals(problemId)
    );

    // If it's the first time, push a new problem entry
    if (problemIndex === -1) {
      user.checkedProblems.push({
        pid: problemId,
        isSolved: false,
        submitDate: new Date(),
      });
      problemIndex = user.checkedProblems.length - 1;
    }

    // Check if this submission is accepted
    const isAccepted = submissionResult.status === "accepted";

    let earnedPoints = 0;
    // If it's the user's first correct submission for this problem, mark it solved and update points
    if (!user.checkedProblems[problemIndex].isSolved && isAccepted) {
      user.checkedProblems[problemIndex].isSolved = true;
      user.checkedProblems[problemIndex].submitDate = new Date();
      earnedPoints = getPoints(problem.difficulty);
      user.points = (user.points || 0) + earnedPoints;
      user.noSolvedProblems = (user.noSolvedProblems || 0) + 1;
    }

    // Total points after this submission
    const closingPoints = user.points || 0;

    // Create a new submission entry
    const newSubmission = new Submission({
      userId,
      problemId,
      submittedCode,
      language,
      earnedPoints,
      closingPoints,
      ...submissionResult, // Spread submission result fields into the document
    });

    // Save both submission and user in the same transaction
    await Promise.all([
      newSubmission.save({ session }),
      user.save({ session }),
    ]);

    // Commit the transaction
    await session.commitTransaction();

    // Return the submission as a success response
    return res.status(201).json(newSubmission);

  } catch (dbError) {
    // If there's an error, roll back the transaction
    if (session?.inTransaction()) {
      await session.abortTransaction();
    }
    return res.status(500).send({
      error: dbError.message,
      message: "Submission couldn't be saved due to server error.",
    });
  } finally {
    // End the session no matter what
    session?.endSession();
  }
};

module.exports = submitProblem;
