const Problem = require("../../models/problems");
const mongoose = require("mongoose");

const addComment = async (req, res) => {
    try {  
        const { problemId } = req.params;
        const { user } = req;
        const { comment } = req.body;

        // checking if problemId is provided or not
        if(!problemId)
            return res.status(400).send({ error: "Problem ID is not given"});

        // checking if the given problemId is valid database object id or not.
        if (!mongoose.Types.ObjectId.isValid(problemId)) 
            return res.status(400).send({ error: "Invalid Problem ID provided."});

        // fetching problem with the given id from the 'problems' collection
        const problem = await Problem.findById(problemId);
        
        // checking if problem with the given id existed in the 'problems' collection or not
        if (!problem) 
            return res.status(404).send({ error: "Problem not found with the given ID."});

        // checking if comment is given or not
        if(!comment) 
            return res.status(404).send({ error: "Comment is not given"});

        // checking if comment is in a string type or not
        if (typeof comment !== 'string' || comment.trim() === '') 
            return res.status(404).send({ error: "Comment should be a valid and non empty string"});

        // creating new comment
        const newComment = {
            user: user._id,
            comment: comment
        }

        // adding comment to a problem
        problem.comments = problem.comments || [];
        problem.comments.push(newComment);

        // saving changes in a problem document
        await problem.save();

        return res.status(200).json({
            message: "Comment added successfully",
            comments: problem.comments
        });

    } catch (error) {
        res.status(500).send({ error: error.message });
  }
};

module.exports = addComment;
