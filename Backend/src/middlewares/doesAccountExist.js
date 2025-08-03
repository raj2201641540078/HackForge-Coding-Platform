const User = require("../models/users");

const doesAccountExist = async (req, res, next) => {
    try{
        const user = await User.findById(req.payload._id);
        if(!user)
            throw new Error("Account does not exist");

        req.user = user;

        next();
    } catch (error) {
        res.status(404).send("Error: "+error.message);
    }
}

module.exports = doesAccountExist;