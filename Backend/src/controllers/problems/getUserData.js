const Problem = require("../../models/problems");
const mongoose = require("mongoose");

const getUserData = async (req, res) => {
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

        const userData = {
            liked: true,
            favourite: true,
            bookmarks: []
        }
        // checking if problem exists in user's liked problem's list
        if(!user.likedProblems || !user.likedProblems.includes(problemId))
            userData.liked = false;

        // checking if problem exists in user's favourite problem's list
        if(!user.favouriteProblems || !user.favouriteProblems.includes(problemId))
            userData.favourite = false;

        if(user.bookmarks)
            userData.bookmarks = user.bookmarks;
        
        return res.status(200).json(userData);
            
    } catch (error) {
        
        res.status(500).send({ error: error.message });

    }
};

module.exports = getUserData;