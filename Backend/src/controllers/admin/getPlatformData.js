const User = require("../../models/users");
const Submission = require("../../models/submissions");
const Problem = require('../../models/problems');
const SolutionVideo = require('../../models/solutionVideo');

const getPlatformData = async (req, res) => {
    try{

        // fetching no of users
        const noUsers = await User.countDocuments({});

        // fetching users 
        const users = await User.find({})
            .select("username fullName role emailId emailVerified createdAt profileImageUrl")
            .sort({ createdAt: -1 }); // latest first

        // fetching no of problems
        const noProblems = await Problem.countDocuments({});

        // fetching problems from database
        const problems = await Problem.find({}).select("_id title problemNo difficulty tags createdAt");

        // fetching no of submissions
        const noSubmissions = await Submission.countDocuments({});

        // fetching latest submissions
        const latestSubmissions = await Submission.find({})
            .select("problemId userId status language createdAt")  
            .sort({ createdAt: -1 }) // latest first
            .limit(4)
            .populate({
                    path: "problemId",
                    select: "_id problemNo title tags difficulty", 
            })
            .populate({
                    path: "userId",
                    select: "username fullName points", 
            })

        // fetching video solutions
        const videoSolutions = await SolutionVideo.find({})
            .select("problem createdAt")  
            .sort({ createdAt: -1 }) // latest first
            .populate({
                path: "problem",
                select: "_id problemNo title tags difficulty", 
            })
            // .populate({
            //         path: "userId",
            //         select: "username fullName", 
            // })

        const reply = {
            noUsers,
            noProblems,
            noSubmissions,
            latestSubmissions,
            problems,
            users,
            videoSolutions
        } 

        res.status(200).json(reply);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error: " + error.message);
    } 
}

module.exports = getPlatformData;
