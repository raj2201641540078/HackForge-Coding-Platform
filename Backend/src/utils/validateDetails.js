const validator = require("validator");
const CustomError = require("../utils/CustomError");

const validateDetails = {

    //  to validate login details
    login: (loginDetails) => {

        const {emailId, password} = loginDetails;

        if(!(emailId && password))
            throw new Error("Some fields are missing");

        if(!validator.isEmail(emailId))
            throw new Error("Invalid Credentials");
    },

    // to validate registeration details
    register: (registerationDetails) => {

        const {username, emailId, password} = registerationDetails;

        if(!(username && emailId && password))
            throw new Error("Some fields are missing");

        if(!validator.isEmail(emailId))
            throw new Error("Invalid email address");

        if(!validator.isStrongPassword(password))
            throw new Error("Weak password")
    },

    // to validate problem details
    problem: (problemDetails) => {
        const mandatoryFields = [ "title", "description", "difficulty", "starterCode", "visibleTestCases", "hiddenTestCases", "referenceSolution", "problemCreator"];
        const givenFields = Object.keys(problemDetails);

        const everyFieldGiven = mandatoryFields.every((field) => givenFields.includes(field));

        if(!everyFieldGiven)
            throw new CustomError("Some fields are missing", 400);

        if(!Array.isArray(problemDetails.starterCode))
            throw new CustomError("starterCode field should be an Array", 400);

        if(!Array.isArray(problemDetails.visibleTestCases))
            throw new CustomError("visibleTestCases field should be an Array", 400);

        if(!Array.isArray(problemDetails.hiddenTestCases))
            throw new CustomError("hiddenTestCases field should be an Array", 400);

        if(!Array.isArray(problemDetails.referenceSolution))
            throw new CustomError("referenceSolution field should be an Array", 400);
    },

}


module.exports = validateDetails;