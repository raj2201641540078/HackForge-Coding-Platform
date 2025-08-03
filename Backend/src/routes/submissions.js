const express = require("express");
const submissionRouter = express.Router();
const { getAllSubmissionsByProblem, getSubmissions, getTotalSubmissionsCount, addNotesToSubmission } = require("../controllers/submissions");
const { verifyToken, doesAccountExist } = require("../middlewares");


// fetch all submissions by page
submissionRouter.get("/", verifyToken, doesAccountExist, getSubmissions);

// fetch total submissions count of a user
submissionRouter.get("/totalCount", verifyToken, doesAccountExist, getTotalSubmissionsCount);

// fetch all submissions of a particular problem
submissionRouter.get("/:problemId", verifyToken, doesAccountExist, getAllSubmissionsByProblem);

// to add notes to a submission
submissionRouter.post("/:submissionId/add-notes", verifyToken, doesAccountExist, addNotesToSubmission);



module.exports = submissionRouter;