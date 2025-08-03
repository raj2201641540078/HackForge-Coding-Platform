const validator = require("validator");
const { getMappedValue } = require('../../utils/utils');

const updateProfile = async (req, res) => {

    try {
        const { user } = req;
        const { username, fullName, emailId } = req.body;
        
        if(!username && !fullName && !emailId)
            return res.status(400).json({ error: "Required fields are missing."});

        if(emailId) {
            if(!validator.isEmail(emailId))
                return res.status(400).json({ error: "Invalid Email Id given."});

            if(emailId !== user.emailId) {
                user.emailId = emailId;
                user.emailVerified = false;
            }
        }

        if(username && username!==user.username) {
            user.username = username;
        }

        if(fullName && fullName!==user.fullName) {
            user.fullName = fullName;
        }

        await user.save();

        const reply = {
            message: "Profile Updated successfully",
            user: {
                username: user.username,
                fullName: user.fullName,
                emailId: user.emailId
            }
        }

        res.status(200).json(reply);

    } catch (error) {
        if(error.code === 11000)
            return res.status(409).json({ name: 'MongoServerError', message: `${getMappedValue(Object.keys(error.keyValue)[0])} already exists`, code: 11000 });

        if (error.name === 'ValidationError') 
            return res.status(400).json({ name: 'ValidationError', message: error.message });
        
        return res.status(500).json({ error: error.message });
    }
}

module.exports = updateProfile;