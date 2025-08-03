const express = require("express");
const problemRouter = express.Router();
const { 
    createProblem, 
    updateProblem, 
    getProblem, 
    getAllProblems, 
    deleteProblem, 
    submitProblem, 
    runProblem, 
    likeProblem, 
    deleteLikeOfProblem, 
    isProblemLiked, 
    favouriteProblem, 
    defavouriteProblem, 
    isProblemFavourite,  
    updateBookmarks,
    getUserData,
    addComment,
    getSavedProblems
} = require("../controllers/problems");
const { 
    verifyToken, 
    doesAccountExist, 
    isAdmin, 
    doesProblemExist,
    storingPendingSubmission
} = require("../middlewares");


// only for admins

// create problems
problemRouter.post("/create", verifyToken, doesAccountExist, isAdmin, createProblem);

// update problems
problemRouter.put("/:id/update", verifyToken, doesAccountExist, isAdmin, updateProblem);

// delete problems
problemRouter.delete("/:id/delete", verifyToken, doesAccountExist, isAdmin, deleteProblem);

// like a problem
problemRouter.post("/:problemId/like", verifyToken, doesAccountExist, doesProblemExist, likeProblem);

// delete like of a problem
problemRouter.delete("/:problemId/like", verifyToken, doesAccountExist, doesProblemExist, deleteLikeOfProblem);

// to check problem is liked by the user or not 
problemRouter.get("/:problemId/liked-by-me", verifyToken, doesAccountExist, isProblemLiked);

// favourite a problem
problemRouter.post("/:problemId/favourite", verifyToken, doesAccountExist, favouriteProblem);

// defavourite a problem
problemRouter.delete("/:problemId/favourite", verifyToken, doesAccountExist, defavouriteProblem);

// to check problem is user's favourite or not 
problemRouter.get("/:problemId/my-favourite", verifyToken, doesAccountExist, isProblemFavourite);

// to get user data related to specific problem
problemRouter.get("/:problemId/user-data", verifyToken, doesAccountExist, getUserData);

// update problems
problemRouter.put("/:id/update-bookmarks", verifyToken, doesAccountExist, updateBookmarks);

// to add comment on a problem
problemRouter.post("/:id/add-comment", verifyToken, doesAccountExist, addComment);

// for both admin and normal users

// fetch problems
// to get user's saved problems - liked, favourite, solved and attempted
problemRouter.get("/user", verifyToken, doesAccountExist, getSavedProblems);

// particular problem
problemRouter.get("/:problemId", verifyToken, doesAccountExist, getProblem);

// all problems
problemRouter.get("/", verifyToken, doesAccountExist, getAllProblems);

// // solved problems
// problemRouter.get("/solved", verifyToken, doesAccountExist, getSolvedProblems);

// to submit problem
problemRouter.post("/:problemId/submit",verifyToken, doesAccountExist, doesProblemExist, storingPendingSubmission, submitProblem);

// to run problem
problemRouter.post("/:problemId/run",verifyToken, doesAccountExist, doesProblemExist, runProblem);


module.exports = problemRouter;