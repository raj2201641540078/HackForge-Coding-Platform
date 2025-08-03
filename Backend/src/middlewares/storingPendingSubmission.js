const Submission = require("../models/submissions");
const User = require("../models/users");
const mongoose = require("mongoose");
const judge0 = require("../judge0/judge0");

const createFullUserSolution = (userSolution, language, starterCode) => {
    const sc = starterCode.find((sc) => sc.language === language);

    const fullUserSolution = (sc.headerCode || "") + "\n" + userSolution + "\n" + (sc.mainCode || "") 

    return fullUserSolution;
}

const storingPendingSubmission = async (req, res, next) => {
  const userId = req.payload._id;
  const { problemId } = req.params;
  const { problem } = req;
  const { submittedCode, language } = req.body;

  // Check if required fields are present
  if (!submittedCode || !language)
    return res.status(400).send("Missing required fields");

  try {
    // adding header and mainCode to userSolution
    const fullUserSolution = createFullUserSolution(submittedCode, language, problem.starterCode);

    // 1. Submitting user's code to Judge0 for evaluation
    const submissionResult = await judge0.submitUserSolution(
      fullUserSolution,
      language,
      problem.hiddenTestCases
    );

    // Format runtime to 4 decimal places if it exists
    if (submissionResult.runtime)
      submissionResult.runtime = submissionResult.runtime.toFixed(4);

    // Attach result to req object for use in the next middleware
    req.submissionResult = submissionResult;

    return next(); // Move to the next handler (usually actual save handler)

  } catch (judgeError) {
    console.log("Judge0 Error:", judgeError.message);

    // If Judge0 fails, still try to save the user's attempt
    let session;
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      // Fetch user with session
      const user = await User.findById(userId).session(session);
      if (!user) throw new Error("User not found");

      // Make sure user's checkedProblems list exists
      user.checkedProblems = user.checkedProblems || [];

      // Check if the problem was already attempted
      const existing = user.checkedProblems.find((p) => p.pid.equals(problemId));

      // Since Judge0 failed, assume 0 earned points
      const closingPoints = user.points || 0;
      const earnedPoints = null;

      // Create a new submission entry (even though Judge0 failed)
      const newSubmission = new Submission({
        userId,
        problemId,
        submittedCode,
        language,
        closingPoints,
        earnedPoints
      });

      if (!existing) {
        // If problem was never attempted, add it to checkedProblems
        user.checkedProblems.push({
          pid: problemId,
          isSolved: false,
          submitDate: new Date(),
        });

        // Save both user and submission in transaction
        await Promise.all([
          newSubmission.save({ session }),
          user.save({ session }),
        ]);
      } else {
        // If already attempted, just save the new submission
        await newSubmission.save({ session });
      }

      // Commit the DB transaction
      await session.commitTransaction();

      // Inform user that submission was saved but Judge0 failed
      return res.status(500).send({
        error: judgeError.message,
        message: "Judge0 failed, but your submission was saved.",
      });

    } catch (dbError) {
      // If DB fails too, abort transaction and send full error
      if (session?.inTransaction()) {
        await session.abortTransaction();
      }
      return res.status(500).send({
        error: dbError.message,
        message: "Judge0 failed, and submission couldn't be saved due to server error.",
      });

    } finally {
      // Always end session
      session?.endSession();
    }
  }
};

module.exports = storingPendingSubmission;

