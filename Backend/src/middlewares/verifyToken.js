const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

// user verification: checking token and block status
// this function will check
// does user has token ? if yes, then if it is valid or not, if valid then check if it is not in a block list.
const verifyToken = async (req, res, next) => {
    try{
        
        // extracting token from cookie
        const {token} = req.cookies;
        if (!token)
            throw new Error("Absence of Token");

        // verifying token
        const payload = jwt.verify(token, process.env.JWT_KEY);
        
        // check if token is blocked or not
        const isBlocked = await redisClient.exists(`token:${token}`);
        if(isBlocked)
            throw new Error("Invalid Token");

        // adding payload in req object
        req.payload = payload;

        next();
    } catch(error) {
        res.status(401).send("Error: "+error.message);
    }   
}

module.exports = verifyToken;