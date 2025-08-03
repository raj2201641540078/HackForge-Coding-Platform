const Problem = require("../../models/problems");
const mongoose = require("mongoose");

const defavouriteProblem = async (req, res) => {
    try {
        
        const { problemId } = req.params;
        const { user } = req;

        // checking if problemId is provided or not
        if(!problemId)
            return res.status(400).send({ error: "Problem ID is not given"});

        // checking if the given problemId is valid database object id or not.
        if (!mongoose.Types.ObjectId.isValid(problemId)) 
            return res.status(400).send({ error: "Invalid Problem ID provided."});

        // fetching problem with the given id from the 'problems' collection
        const problemExists = await Problem.exists({_id: problemId});
       
        // checking if problem with the given id existed in the 'problems' collection or not
        if (!problemExists) 
            return res.status(404).send({ error: "Problem not found with the given ID."});

        // checking if given problem is already in favourite's list or not
        if (!user.favouriteProblems || !user.favouriteProblems.includes(problemId)) {
            return res.status(200).send({
                message: "Problem already not in favourite's list",
                favourite: false
            });
        }

        // removing given problem from the user favourite problem's list
        user.favouriteProblems = user.favouriteProblems.filter(pid => !pid.equals(problemId));

        // updating user
        await user.save();

        // sending response to client
        res.status(200).send({
            message: "Problem removed successfully from favourite's list",
            favourite: false
        });

    } catch (error) {
        
        res.status(500).send({ error: error.message });

    }
};

module.exports = defavouriteProblem;