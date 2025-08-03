const Submission = require("../../models/submissions");
const mongoose = require("mongoose");

const getAllSubmissionsByProblem = async (req, res) => {
    try{

        const { problemId } = req.params;
        const { _id: userId } = req.payload;

        // checking if given problem Id is valid or not
        if (!mongoose.Types.ObjectId.isValid(problemId)) 
            return res.status(400).send("Invalid Problem ID provided.");

        // fetching all problems from database
        const submissions = await Submission.find({ userId, problemId });

        res.status(200).json(submissions);

    } catch (error) {
        res.status(500).send("Error: " + error);
    }
}

module.exports = getAllSubmissionsByProblem;