const User = require("../../models/users");

const getSavedProblems = async (req, res) => {
    try{
        const userId = req.payload._id;

        const userSavedProblems = await User.findById(userId)
            .select("likedProblems favouriteProblems checkedProblems")
            .populate([
                {
                    path: 'checkedProblems.pid',
                    select: '_id problemNo title tags difficulty' 
                },
                {
                    path: 'likedProblems',
                    select: '_id problemNo title tags difficulty'
                },
                {
                    path: 'favouriteProblems',
                    select: '_id problemNo title tags difficulty' 
                },   
            ]);

        res.status(200).json(userSavedProblems);

    } catch (error) {
        res.status(500).send("Error: " + error);
    }
}

module.exports = getSavedProblems;