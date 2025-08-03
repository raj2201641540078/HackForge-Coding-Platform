const { getDayDifferenceFromDate } = require("../../utils/utils");

const sendUserBasicDetails = async (req, res) => {
    try{
        
        const { user } = req;
        const { streaks } = user;
        
        const lastUpdated = getDayDifferenceFromDate(streaks.lastUpdated);
        if(lastUpdated>0) {
            if(lastUpdated===1) 
                streaks.current++;
            else 
                streaks.current = 1;
            if(streaks.current > streaks.longest)
                streaks.longest = streaks.current;

            user.streaks.lastUpdated = new Date();

            await user.save();
        }

        const reply = {
            user: {
                username: user.username,
                fullName: user.fullName,
                _id: user._id,
                emailId: user.emailId,
                emailVerified: user.emailVerified,
                profileImageUrl: user.profileImageUrl,
                role: user.role,
                streaks: user.streaks
            },
            message: "authentication successfull"
        }

        res.status(200).json(reply);

    } catch (error) {
        res.status(404).send("Error: " + error.message);
    } 
}

module.exports = sendUserBasicDetails;