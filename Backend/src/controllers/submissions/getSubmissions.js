const Submission = require("../../models/submissions");

const getSubmissions = async (req, res) => {
    try{
        const userId = req.payload._id;
        const page = parseInt(req.query.page) || 1;     // default page 1
        const limit = parseInt(req.query.limit) || 10;  // default 10 submissions per page
        const skip = (page - 1) * limit;

        if (page < 1) 
            return res.status(400).json({ error: "Page must be >= 1" });
        
        const userSubmissions = await Submission.find({ userId })  
            .sort({ createdAt: -1 }) // latest first
            .skip(skip)
            .limit(limit)
            .populate({
                    path: "problemId",
                    select: "_id problemNo title tags difficulty", 
            })

        res.status(200).json(userSubmissions);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error: " + error.message);
    } 
}

module.exports = getSubmissions;