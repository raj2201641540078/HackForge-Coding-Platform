const express = require("express");
const aiRouter = express.Router();
const { verifyToken, doesAccountExist } = require("../middlewares");
const chatAI = require("../controllers/ai/chatAI");
const getComplexitiesFromAI = require("../controllers/ai/getComplexitiesFromAI");

// to chat AI for a particular problem
aiRouter.post("/chatAI", verifyToken, chatAI);

aiRouter.post("/complexities", verifyToken, getComplexitiesFromAI);

module.exports = aiRouter;