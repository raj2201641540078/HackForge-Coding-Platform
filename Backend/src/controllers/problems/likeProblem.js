const Problem = require("../../models/problems");
const mongoose = require("mongoose");

const likeProblem = async (req, res) => {
  // Starting a MongoDB session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { problemId } = req.params;
    const { user , problem} = req;

    // checking if the problem is already liked by the user
    const alreadyLiked = user.likedProblems?.includes(problemId);
    if (alreadyLiked) {
      // Ending session since no write is needed
      await session.abortTransaction();
      session.endSession();
      return res.status(200).send({
        message: "problem already liked",
        liked: true,
      });
    }

    // adding problem in user's liked problem's list
    user.likedProblems = user.likedProblems || [];
    user.likedProblems.push(problemId);

    // updating user
    await user.save({ session });

    // increasing likes of a problem
    problem.likes = (problem.likes || 0) + 1;

    // saving changes
    await problem.save({ session });

    // committing transaction
    await session.commitTransaction();
    session.endSession();

    // sending response to client
    res.status(200).send({
      message: "problem liked successfully",
      liked: true,
    });

  } catch (error) {
    // rolling back transaction in case of error
    await session.abortTransaction();
    session.endSession();
    res.status(500).send({ error: error.message });
  }
};

module.exports = likeProblem;
