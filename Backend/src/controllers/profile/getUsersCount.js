const User = require("../../models/users");

const getUsersCount = async (req, res) => {
    try{

        const totalUsers = await User.countDocuments({});

        res.status(200).json({ totalUsers });

    } catch (error) {

        console.log(error);
        res.status(500).json({ error: error.message });
        
    } 
}

module.exports = getUsersCount;
