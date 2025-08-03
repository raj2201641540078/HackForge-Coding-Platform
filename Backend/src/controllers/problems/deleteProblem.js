const Problem = require("../../models/problems");
const mongoose = require("mongoose");

const deleteProblem = async (req, res) => {
    try {
        
        const { id } = req.params;

        // checking if id is provided or not
        if(!id)
            return res.status(400).send({ error: "Problem ID is not given"});

        // checking if the given id is valid database object id or not.
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(400).send({ error: "Invalid Problem ID provided."});

        // fetching problem with the given id from the 'problems' collection
        const deletedProblem = await Problem.findByIdAndDelete(id);

        // checking if problem with the given id existed in the 'problems' collection or not
        if (!deletedProblem) 
            return res.status(404).send({ error: "Problem not found with the given ID."});

        res.status(200).send(deletedProblem);

    } catch (error) {
        
        res.status(500).send({ error: error.message });

    }
};

module.exports = deleteProblem;