const User = require("../../models/users")
const validateDetails = require("../../utils/validateDetails");
const password = require("../../utils/password");
const jwt = require("jsonwebtoken");
const { getDayDifferenceFromDate } = require("../../utils/utils");


const login = async (req, res) => {
    try {
        // this validator fnctions ensures that req.body will always have mandatory fields, and email is valid
        validateDetails.login(req.body);

        // this function first checks whether the user with the given email exists
        // If yes, then checks whether the given password is right or wrong
        // if password is true, then returns user details else throw error "Invalid Credentials"
        const user = await getUser(req.body)
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
        
        // generating jwt token
        const token = jwt.sign({ _id: user._id, username: user.username, emailId: user.emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: 3600 });

        // creating reply
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
            message: "Logged in successfully"
        } 

        // sending cookie
        res.cookie("token", token, { maxAge: 3600000 });

        // sending response with status code
        res.status(201).json(reply);

    } catch(error) {
        console.log(error);
        res.status(500).send("Error: " + error.message);
    }
}


// this function takes the user details then, 
// first checks whether the user with the given email exists
// If yes, then checks whether the given password is right or wrong
// if password is true, then returns user details else throw error "Invalid Credentials"
async function getUser ({emailId, password: givenPassword}) {
        // extracting user details with the given emailId
        const user = await User.findOne({emailId});
        if(!user || !user.password)
            throw new Error("Invalid Credentials");

        // comparing given password with the user real password
        const isRightPassword = await password.compare(givenPassword, user.password);
        if(!isRightPassword)
            throw new Error("Invalid Credentials");
        
        // if all credentials are right
        return user;
}

module.exports = login;