const express = require("express");
const authRouter = express.Router();
const { register, login, logout, sendUserBasicDetails } = require("../controllers/authentication");
const { verifyToken, doesAccountExist, isAdmin } = require("../middlewares");
const { authWithGoogle, redirectToGooglePage } = require("../controllers/authentication/continueWithGoogle");
const { authWithGithub, redirectToGithubPage } = require("../controllers/authentication/continueWithGithub");
const { sendVerificationEmail, verifyEmail } = require("../controllers/authentication/verifyEmail");

// authenticating user
authRouter.get("/check", verifyToken, doesAccountExist, sendUserBasicDetails);

// registeration
authRouter.post("/register", register);

// login
authRouter.post("/login", login);

// logout 
authRouter.post("/logout", verifyToken, doesAccountExist, logout);

// for only admin
authRouter.post("/admin/register", verifyToken, doesAccountExist, isAdmin, register);

// Google Signin
// Redirect user to Google's consent screen
authRouter.get('/google', redirectToGooglePage);

// Handle callback and get tokens
authRouter.get('/google/callback', authWithGoogle);

// Github signin
authRouter.get('/github', redirectToGithubPage);
authRouter.get('/github/callback', authWithGithub);

// to send verification link to the user's email id
authRouter.get('/verify-email/initialize', verifyToken, doesAccountExist, sendVerificationEmail);

// to verify email
authRouter.get('/verify-email', verifyEmail);


module.exports = authRouter;