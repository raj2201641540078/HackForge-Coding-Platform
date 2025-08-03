const mongoose = require("mongoose");
const { Schema } = mongoose;

const submissionSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'problems',
        required: true
    },

    submittedCode: {
        type: String,
        required: true
    },

    language: {
        type: String,
        enum: ["c", "cpp", "java", "javascript", "python"],
        required: true
    },
    closingPoints: {
        type: Number
    },
    earnedPoints: {
        type: Number
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "wrong-answer", "compilation-error", "runtime-error", "tle"],
        default: "pending"
    },

    runtime: {
        type: Number,  // milliseconds
    },

    memory: {
        type: Number,  // kb
    },

    errorMessage: {
        type: String,
    },

    passedTestCases: {
        type: Number,
    },

    totalTestCases: {
        type: Number,
    },

    notes: {
        type: String,
        minLength: 2,
        maxLength: 300,
    }

}, { timestamps: true });

// creating new collection "submissions"
const Submission = mongoose.model('submissions', submissionSchema);

module.exports = Submission;