const User = require("../../models/users");

const getLeaderboard = async (req, res) => {
    try{

        const page = parseInt(req.query.page) || 1;    
        const limit = parseInt(req.query.limit) || 10;  
        const skip = (page - 1) * limit;
        
        if (page < 1) 
            return res.status(400).json({ error: "Page must be >= 1" });

        if(limit < 10)
            return res.status(400).json({ error: "Limit must be >= 10" });

        const user = await User.findById(req.payload._id).select("_id username fullName profileImageUrl noSolvedProblems checkedProblems points")
            .populate([
                {
                    path: 'checkedProblems.pid',
                    select: '_id problemNo title tags difficulty' // only these fields from the referenced User
                },
            ])

        if(!user)
           return res.status(400).send("User does not exist");

        const usersAhead = await User.countDocuments({
            $or: [
                { points: { $gt: user.points } },
                {
                points: user.points,
                noSolvedProblems: { $gt: user.noSolvedProblems }
                },
                {
                points: user.points,
                noSolvedProblems: user.noSolvedProblems,
                username: { $lt: user.username } // comes earlier alphabetically
                }
            ]
        });
        const plainUser = user.toObject();
        plainUser.rank = usersAhead + 1;

        const leaderboard = await User.find({})
            .sort({
                points: -1,
                noSolvedProblems: -1,
                username: 1
            })
            .skip(skip)
            .limit(limit)
            .select('_id username points noSolvedProblems profileImageUrl');

        const reply = {
            user: plainUser,
            leaderboard: leaderboard
        }

        res.status(200).json(reply);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    } 
}

module.exports = getLeaderboard;
