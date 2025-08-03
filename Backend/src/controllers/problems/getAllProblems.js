const Problem = require("../../models/problems");

const getAllProblems = async (req, res) => {
    try{
        
        // fetching all problems from database
        const allProblems = await Problem.find({}).select("_id title problemNo difficulty tags");

        res.status(200).send(allProblems);

    } catch (error) {
        res.status(500).send("Error: " + error);
    }
}

module.exports = getAllProblems;