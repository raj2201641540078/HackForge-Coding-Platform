const Problem = require("../../models/problems");
const mongoose = require("mongoose");

const deleteLikeOfProblem = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { problemId } = req.params;
    const { user, problem } = req;

    // checking if given problem is already liked or not
    if (!user.likedProblems || !user.likedProblems.includes(problemId)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(200).send({
        message: "Problem already unliked",
        liked: false
      });
    }

    // removing given problem from the user liked problem's list
    user.likedProblems = user.likedProblems.filter(pid => !pid.equals(problemId));

    // updating user
    await user.save({ session });

    // decreasing likes of a problem
    problem.likes = Math.max((problem.likes || 1) - 1, 0); // prevent negative count

    // saving changes
    await problem.save({ session });

    // committing transaction
    await session.commitTransaction();
    session.endSession();

    // sending response to client
    res.status(200).send({
      message: "Problem unliked successfully",
      liked: false
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send({ error: error.message });
  }
};

module.exports = deleteLikeOfProblem;
