const Problem = require("../../models/problems");
const mongoose = require("mongoose");
const SolutionVideo = require('../../models/solutionVideo');

const getProblem = async (req, res) => {
    try {

        const { problemId } = req.params;
        
        // checking if the given id is valid database object id or not.
        if (!mongoose.Types.ObjectId.isValid(problemId)) 
            return res.status(400).send({ error: "Invalid Problem ID provided."});

        // fetching problem with the given id from the 'problems' collection
        const problem = await Problem.findById(problemId).select("-hiddenTestCases -problemCreator -__v");

        // checking if problem with the given id exists in the 'problems' collection or not
        if (!problem) 
            return res.status(404).send({ error: "Problem not found with the given ID."});

        const videoMetaData = await SolutionVideo.findOne({ problem: problemId });

        if(videoMetaData){ 
            const plainProblem = problem.toObject();

            plainProblem.secureUrl = videoMetaData.secureUrl;
            plainProblem.cloudinaryPublicId = videoMetaData.cloudinaryPublicId;
            plainProblem.thumbnailUrl = videoMetaData.thumbnailUrl;
            plainProblem.duration = videoMetaData.duration;

            return res.status(200).send(plainProblem);
        }
        
        res.status(200).send(problem);

    } catch (error) {
        
        res.status(500).send({ error: error.message });

    }
};

module.exports = getProblem;