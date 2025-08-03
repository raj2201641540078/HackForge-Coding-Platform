const Problem = require("../../models/problems");
const mongoose = require("mongoose");

const updateBookmarks = async (req, res) => {

    try {

        const { id } = req.params;
        const { user } = req;
        const { bookmarks } = req.body;

        // checking if the given id is valid database object id or not.
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(400).send({ error: "Invalid Problem ID provided."});

        // checking if problem with the given id exists in the 'problems' collection or not
        const problem = await Problem.findById(id);
        if(!problem)
            return res.status(404).send({ error: "Problem not found with the given ID."});
        
        // validating bookmarks field
        if(!Array.isArray(bookmarks))
            return res.status(404).send({ error: "Bookmarks field should be an array"});

        // updating bookmarks
        user.bookmarks = bookmarks;
        await user.save();

        res.status(201).send(user.bookmarks);

    } catch (error) {
        const status = error.statusCode || 500;
        res.status(status).send({ error: error.message });
    } 
}

module.exports = updateBookmarks;