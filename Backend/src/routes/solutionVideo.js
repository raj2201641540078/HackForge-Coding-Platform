const express = require('express');
const solutionVideoRouter =  express.Router();
const { getVideoSignature, saveVideoMetaData, deleteSolutionVideo } = require('../controllers/solutionVideo');
const { 
    verifyToken, 
    doesAccountExist, 
    isAdmin, 
} = require("../middlewares");

solutionVideoRouter.get("/upload/:problemId", verifyToken, doesAccountExist, isAdmin, getVideoSignature);
solutionVideoRouter.post("/save/:problemId", verifyToken, doesAccountExist, isAdmin, saveVideoMetaData);
solutionVideoRouter.delete("/delete/:problemId", verifyToken, doesAccountExist, isAdmin, deleteSolutionVideo);

module.exports = solutionVideoRouter;