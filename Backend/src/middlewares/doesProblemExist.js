const Problem = require("../models/problems");
const mongoose = require("mongoose");

const doesProblemExist = async (req, res, next) => {
    try{
        const { problemId } = req.params;

        // is problemId given
        if(!problemId)
            return res.status(400).send({ error: "Missing Problem ID" });

        // checking if given problem Id is valid or not
        if (!mongoose.Types.ObjectId.isValid(problemId)) 
            return res.status(400).send({ error: "Invalid Problem ID provided" });
        
        // fetching problem from database
        const problem = await Problem.findById(problemId);

        // checking if the problem with the given problem id exists in the database or not
        if(!problem)
            return res.status(400).send({ error: "Problem doesn't exist" });

        req.problem = problem;

        next();
    } catch (error) {
        res.status(500).send({ error:  error.message });
    }
}

module.exports = doesProblemExist;