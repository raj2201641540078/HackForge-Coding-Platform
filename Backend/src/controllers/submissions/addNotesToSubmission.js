const Submission = require("../../models/submissions");
const mongoose = require("mongoose");

const addNotesToSubmission = async (req, res) => {
    try{
        const userId = req.payload._id;
        const { submissionId } = req.params;
        const { submissionNotes } = req.body;
        
        // checking if given problem Id is valid or not
        if (!mongoose.Types.ObjectId.isValid(submissionId)) 
            return res.status(400).json({error: "Invalid Submission ID provided."});

        const userSubmission = await Submission.findById(submissionId);
        
        if(!userSubmission)
            return res.status(400).json({error: "Submission with the give ID is missing"});

        // checking if the requested user id and submission's user id is same or not
        if(!userSubmission.userId.equals(userId))
            return res.status(400).json({error: "You can only add notes to your submissions."});

        userSubmission.notes = submissionNotes;

        await userSubmission.save();

        const reply = {
            notes: userSubmission.notes,
            message: "Notes added successfully"
        }

        res.status(200).json(reply);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    } 
}

module.exports = addNotesToSubmission;