const redisClient = require("../../config/redis");

const logout = async (req, res) => {
    try {
        const {token} = req.cookies;

        // adding token in blocked list
        await redisClient.set(`token:${token}`, 'Blocked');
        await redisClient.expireAt(`token:${token}`, req.payload.exp);

        // clear the cookie with the same options
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            expires: new Date(0)
        });

        res.status(200).send("Logged out successfully");
    } catch (error) {
        res.status(503).send("Error: "+error);
    }

}

module.exports = logout;