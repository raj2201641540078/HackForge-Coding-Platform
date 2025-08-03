const validateDetails = require("../../utils/validateDetails");
const judge0 = require("../../judge0/judge0");
const Problem = require("../../models/problems");
const mongoose = require("mongoose");

const updateProblem = async (req, res) => {

    try {

        const { id } = req.params;

        // checking if the given id is valid database object id or not.
        if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(400).send({ error: "Invalid Problem ID provided."});

        // checking if problem with the given id exists in the 'problems' collection or not
        const problem = await Problem.findById(id);
        if(!problem)
            return res.status(404).send({ error: "Problem not found with the given ID."});

        // validating problem details, if all the required fields are given or not
        await validateDetails.problem(req.body);

        // checking given refernce solution, if reference solution is itself satisfying the given test cases or not
        await judge0.submit(req.body);
        
        // updating document in the collection 'problems'
        const updatedProblem = await Problem.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });

        res.status(201).send(updatedProblem);

    } catch (error) {
        const status = error.statusCode || 500;
        res.status(status).send({ error: error.message });
    } 
}

module.exports = updateProblem;