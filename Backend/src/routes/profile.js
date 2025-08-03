const express = require("express");
const profileRouter = express.Router();
const { verifyToken, doesAccountExist } = require("../middlewares");
const { updateProfile, getMyProfile, getDailyActivityInfo, getYearlyActivity, getUserCheckedProblems, getLeaderboard, getUsersCount, getUserBasicProfile, getImageSignature, saveImageMetaData, getUserSprints } = require("../controllers/profile");

// update profile
profileRouter.patch("/update", verifyToken, doesAccountExist, updateProfile);

// upload profile image
profileRouter.get("/image/upload", verifyToken, doesAccountExist, getImageSignature);

// save profile image
profileRouter.patch("/image/save", verifyToken, doesAccountExist, saveImageMetaData);

// get profile
profileRouter.get("/@me", verifyToken, getMyProfile);

// get daily activity information
profileRouter.get("/get-daily-activity", verifyToken, doesAccountExist, getDailyActivityInfo);

// get yearly activity information
profileRouter.get("/get-yearly-activity", verifyToken, doesAccountExist, getYearlyActivity);

// get user checked problems
profileRouter.get("/checked-problems", verifyToken, doesAccountExist, getUserCheckedProblems);

// get leaderboard
profileRouter.get("/leaderboard", verifyToken, getLeaderboard);

// get leaderboard
profileRouter.get("/users-count", verifyToken, getUsersCount);

// get user basic profile
profileRouter.get("/leaderboard/:userId", verifyToken, getUserBasicProfile);

// get user sprints
profileRouter.get("/my-sprints", verifyToken, doesAccountExist, getUserSprints);

module.exports = profileRouter;