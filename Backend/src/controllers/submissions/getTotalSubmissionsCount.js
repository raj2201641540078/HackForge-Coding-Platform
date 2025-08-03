const Submission = require("../../models/submissions");

const getTotalSubmissionsCount = async (req, res) => {
    try{
        const userId = req.payload._id;

        const totalSubmissionsByUser = await Submission.countDocuments({ userId });
        const totalPagesForLimit10 = Math.ceil(totalSubmissionsByUser/10);

        res.status(200).json({ totalSubmissions: totalSubmissionsByUser, totalPagesForLimit10 });

    } catch (error) {
        console.log(error);
        res.status(500).send("Error: " + error.message);
    } 
}

module.exports = getTotalSubmissionsCount;
