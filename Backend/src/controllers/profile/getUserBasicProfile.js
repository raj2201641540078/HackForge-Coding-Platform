const User = require("../../models/users");
const mongoose = require("mongoose");

const getUserBasicProfile = async (req, res) => {
    try{

        const { userId } = req.params;

        if(!userId)
            return res.status(400).send("User Id is missing");

        if (!mongoose.Types.ObjectId.isValid(userId)) 
            return res.status(400).send("Invalid Problem ID provided.");

        const user = await User.findById(userId).select("_id username fullName profileImageUrl noSolvedProblems checkedProblems points")
            .populate([
                {
                    path: 'checkedProblems.pid',
                    select: '_id problemNo title tags difficulty' // only these fields from the referenced User
                },
            ])

        if(!user)
           return res.status(400).send("User does not exist");

        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    } 
}

module.exports = getUserBasicProfile;
