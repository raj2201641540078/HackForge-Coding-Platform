const Problem = require("../../models/problems");
const mongoose = require("mongoose");

const isProblemLiked = async (req, res) => {
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

        // checking if problem exists in user's liked problem's list
        if(!user.likedProblems || !user.likedProblems.includes(problemId))
            return res.status(200).json({
                liked: false,
                message: "problem is unliked"
            });
        
        return res.status(200).json({
            liked: true,
            message: "problem is liked"
        });

    } catch (error) {
        
        res.status(500).send({ error: error.message });

    }
};

module.exports = isProblemLiked;