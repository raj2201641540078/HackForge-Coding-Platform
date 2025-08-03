const createProblem = require("./createProblem");
const updateProblem = require("./updateProblem");
const deleteProblem = require("./deleteProblem");
const getAllProblems = require("./getAllProblems");
const getProblem = require("./getProblem");
const submitProblem = require("./submitProblem");
const runProblem = require("./runProblem");
// const getSolvedProblems = require("./getSolvedProblems");
const likeProblem = require("./likeProblem");
const deleteLikeOfProblem = require("./deleteLikeOfProblem");
const isProblemLiked = require("./isProblemLiked");
const favouriteProblem = require("./favouriteProblem");
const defavouriteProblem = require("./defavouriteProblem");
const isProblemFavourite = require("./isProblemFavourite");
const updateBookmarks = require("./updateBookmarks");
const getUserData = require("./getUserData");
const addComment = require("./addComment");
const getSavedProblems = require("./getSavedProblems");

module.exports = { 
    createProblem, 
    updateProblem, 
    deleteProblem, 
    getAllProblems, 
    getProblem,
    // getSolvedProblems,
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
};