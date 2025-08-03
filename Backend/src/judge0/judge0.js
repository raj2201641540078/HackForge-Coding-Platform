const axios = require("axios");
const isObject = require("../utils/isObject");
const { sleep } = require("../utils/utils"); 
const CustomError = require("../utils/CustomError");

const judge0 = {

  // languages Ids
  languageId: {
    c: 110,
    cpp: 105,
    java: 91,
    javascript: 102,
    python: 109 
  },

  // error Ids
  errors: {
    4: "Wrong Answer",
    5: "Time Limit Exceeded",
    6: "Compilation Error",
    7: "Runtime Error (SIGSEGV)",
    8: "Runtime Error (SIGXFSZ)",
    9: "Runtime Error (SIGFPE)",
    10: "Runtime Error (SIGABRT)",
    11: "Runtime Error (NZEC)",
    12: "Runtime Error (Other)",
    13: "Internal Error",
    14: "Exec Format Error"
  },


  // to submitting solution to judge0
  validateProblem: async function (referenceSolution, testCases) {   

    // creating submission batch
    const submissionBatch = this.createSubmissionBatch(referenceSolution, testCases);

    // submitting batch to judge0
    const result = await this.submitBatch(submissionBatch);
    
    // checking result
    await this.checkResult(result.data);

  },

  // to check the user submitted result
  submitUserSolution: async function (userSolution, language, testCases) {   

    // creating submission batch
    const submissionBatch = this.createSubmissionBatch([{language: language, solutionCode: userSolution}], testCases);

    // submitting batch to judge0
    const result = await this.submitBatch(submissionBatch);
    
    // checking result
    return await this.getSubmissionResult(result.data);

  },

  // to run user solution
  runUserSolution: async function (userSolution, language, testCases) {   

    // creating submission batch
    const submissionBatch = this.createSubmissionBatch([{language: language, solutionCode: userSolution}], testCases);

    // submitting batch to judge0
    const result = await this.submitBatch(submissionBatch);
    
    // checking result
    return await this.getRunTestResult(result.data);

  },

  // this fuctions creates submission batch
  createSubmissionBatch: function (solutions, testCases) {

    const submissionBatch = [];
    
    for (const solution of solutions) {

      if(!isObject(solution))
        throw new CustomError("Solution Array can only contain elements of type Object", 400)

      if(solution.solutionCode == "")
        throw new CustomError("SolutionCode could not be empty field", 400);

      languageId = this.getLanguageId(solution.language);

      for (const testCase of testCases) {
        const batch = {
          language_id: languageId,
          source_code: solution.solutionCode,
          stdin: testCase.input,
          expected_output: testCase.output
        }

        submissionBatch.push(batch);
      }
      
    }

    return submissionBatch;
  },


  // submitting batch
  submitBatch: async function (submissionBatch) {

    const options = {
      method: 'POST',
      url: process.env.JUDGE0_URL,
      params: {
        base64_encoded: 'false'
      },
      headers: {
        'x-rapidapi-key': process.env.X_RAPID_API_KEY,
        'x-rapidapi-host': process.env.X_RAPID_API_HOST,
        'Content-Type': 'application/json'
      },
      data: {
        // adding submission batch
        submissions: submissionBatch    
      }
    };

    // submitting to judge0
    const result = await axios.request(options);

    return result;

  },
 
  
  // this function returns the language Id  if exists otherwise throw an error 'Invalid language'
  getLanguageId: function (language) {
    const languageId = this.languageId[language];

    if(!languageId)
      throw new CustomError(`Invalid language: '${language}' given in referenceSolution`, 400);

    return languageId;
  },


  // check result
  checkResult: async function (tokens) {
    
    const tokenString = this.createTokenString(tokens);

    const options = {
      method: 'GET',
      url: process.env.JUDGE0_URL,
      params: {
        tokens: tokenString,
        base64_encoded: 'false',
        fields: '*'
      },
      headers: {
        'x-rapidapi-key': process.env.X_RAPID_API_KEY,
        'x-rapidapi-host': process.env.X_RAPID_API_HOST
      }
    };

    // checking if all testCases has successfully run or not 
    let result;
    while(true) {

      result = (await axios.request(options)).data.submissions;
      const allTestCasesRun = result.every((testCase) => testCase.status_id>2)

      if(allTestCasesRun)
        break;

      await sleep(1000);
    
    }

    // checking have all test cases passed
    for (const testCase of result) {
      
      if(testCase.status_id != 3)
        throw new CustomError(this.errors[testCase.status_id], 400);
    }
  },

  // to get Submission result
  getSubmissionResult: async function (tokens) {
    
    const tokenString = this.createTokenString(tokens);

    const options = {
      method: 'GET',
      url: process.env.JUDGE0_URL,
      params: {
        tokens: tokenString,
        base64_encoded: 'false',
        fields: '*'
      },
      headers: {
        'x-rapidapi-key': process.env.X_RAPID_API_KEY,
        'x-rapidapi-host': process.env.X_RAPID_API_HOST
      }
    };

    // checking if all testCases has successfully run or not 
    let result;
    while(true) {

      result = (await axios.request(options)).data.submissions;
      const allTestCasesRun = result.every((testCase) => testCase.status_id>2)

      if(allTestCasesRun)
        break;

      await sleep(1000);
    
    }

    const submissionResult = {
      totalTestCases: result.length
    }
    // checking have all test cases passed
    for (const testCase of result) {

      if(testCase.status_id == 5) {

        submissionResult.status = "tle";
        submissionResult.errorMessage = testCase.compile_output;

        return submissionResult;

      }

      if(testCase.status_id == 6) {

        submissionResult.status = "compilation-error";
        submissionResult.errorMessage = testCase.compile_output;

        return submissionResult;

      }

      if(testCase.status_id >12) {

        submissionResult.status = "pending";
        submissionResult.errorMessage = testCase.compile_output;

        return submissionResult;

      }

      if(testCase.status_id > 6) {

        if(!submissionResult.passedTestCases)
          submissionResult.passedTestCases = 0;
      
        submissionResult.status = "runtime-error";
        submissionResult.errorMessage = testCase.compile_output;
        return submissionResult;

      }

      if(!submissionResult.passedTestCases) {
        submissionResult.passedTestCases = 0;
        submissionResult.runtime = 0;
        submissionResult.memory = 0;
      }
      
      if(testCase.status_id==3)
        submissionResult.passedTestCases++;

      submissionResult.runtime += parseFloat(testCase.time);
      if(testCase.memory > submissionResult.memory)
        submissionResult.memory = testCase.memory;
    }
    
    if(submissionResult.passedTestCases<result.length)
      submissionResult.status = "wrong-answer";
    else
      submissionResult.status = "accepted";

    return submissionResult;
  },  

  // to get run test result
  getRunTestResult: async function (tokens) {
    
    const tokenString = this.createTokenString(tokens);

    const options = {
      method: 'GET',
      url: process.env.JUDGE0_URL,
      params: {
        tokens: tokenString,
        base64_encoded: 'false',
        fields: '*'
      },
      headers: {
        'x-rapidapi-key': process.env.X_RAPID_API_KEY,
        'x-rapidapi-host': process.env.X_RAPID_API_HOST
      }
    };

    // checking if all testCases has successfully run or not 
    let result;
    while(true) {

      result = (await axios.request(options)).data.submissions;
      const allTestCasesRun = result.every((testCase) => testCase.status_id>2)

      if(allTestCasesRun)
        break;

      await sleep(1000);
    
    }

    let runTestResult = []
    // checking if all test cases passed
    for (const testCase of result) {

      const testResult = {
        status: null,
        runtime: testCase.time,
        memory: testCase.memory,
        errorMessage: testCase.compile_output,
        input: testCase.stdin,
        expectedOutput: testCase.expected_output,
        output: testCase.stdout
      }

      if(testCase.status_id==3)
        testResult.status = "accepted";
      else if(testCase.status_id==4) 
        testResult.status = "wrong-answer";
      else if(testCase.status_id==5) 
        testResult.status = "tle";
      else if(testCase.status_id == 6) 
        testResult.status = "compilation-error";
      else if(testCase.status_id >12) 
        testResult.status = "pending";
      else 
        testResult.status = "runtime-error";

      runTestResult.push(testResult);

    }
    return runTestResult;
  },  

  createTokenString: function (tokens) {
    return tokens.map(tokenObject => tokenObject.token).join(',');
  }

}

module.exports = judge0;
