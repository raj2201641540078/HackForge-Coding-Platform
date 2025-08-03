const User = require("../../models/users");
const Submission = require("../../models/submissions");

const getMyProfile = async (req, res) => {
    try{

        const user = await User.findById(req.payload._id).select("-password -__v")
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

        const userSubmissions = await Submission.find({userId: user._id})  
            .sort({ createdAt: -1 }) // latest first
            .limit(10)
            .populate({
                    path: "problemId",
                    select: "_id problemNo title tags difficulty", 
            })
        const plainUser = user.toObject();
        plainUser.rank = usersAhead + 1;
        plainUser.submissions = userSubmissions;

        res.status(200).json(plainUser);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error: " + error.message);
    } 
}

module.exports = getMyProfile;
