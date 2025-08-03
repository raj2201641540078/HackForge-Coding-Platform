const User = require("../../models/users");

const getUserSprints = async (req, res) => {
    try{

        const userId = req.payload._id;

        const userSprints = await User.findById(userId)
            .select("bookmarks checkedProblems")
            .populate([
                {
                    path: 'bookmarks.problems',
                    select: '_id problemNo title tags difficulty' 
                }
            ]);

        if(userSprints.bookmarks)
            return res.status(200).json(userSprints);

        const plainUserSprints = userSprints.toObject();
        plainUserSprints.bookmarks = [];
        
        res.status(200).json(plainUserSprints);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getUserSprints;