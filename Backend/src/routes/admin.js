const express = require("express");
const adminRouter = express.Router();
const { getPlatformData } = require("../controllers/admin");
const { verifyToken, doesAccountExist, isAdmin } = require("../middlewares");

// get platform data to send to admin portal
adminRouter.get("/platform-data", verifyToken, doesAccountExist, isAdmin, getPlatformData);

module.exports = adminRouter;