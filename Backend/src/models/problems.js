const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema for comments
const comments = new mongoose.Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref: 'users',
    },
    comment: {
        type: String,
        trim: true
    }
}, { _id: false, timestamps: true });

// schema for problems
const problemSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    problemNo: {
        type: Number,
        required: true,
        min: 1,
        unique:true
    },
    description: {
        type: "String",
        required: true,
        trim: true
    },
    difficulty: {
        type: String,
        enum: ["Basic", "Easy", "Medium", "Hard"],
        required: true,
        trim: true
    },
    tags: {
        type: [{
            type: String,
            enum: [
                "strings",
                "arrays",
                "linked-list",
                "stacks",
                "queues",
                "hash-maps",
                "sorting",
                "searching",
                "binary-search",
                "graphs",
                "trees",
                "dynamic-programming",
                "backtracking",
                "greedy",
                "heap",
                "bit-manipulation",
                "mathematical",
                "two-pointers",
                "sliding-window",
                "recursion",
                "design",
                "math",
                "prefix-sum",
                "other"
            ],
            required: true,
            trim: true
        }],
        required: true
    },
    acceptance: {
        type: Number,
        default: null
    },
        constraints: {
        type: [{
           type: String,
           trim: true
        }],
        required: true
    },
    starterCode: [
        {
            language: {
                type: String,
                enum: ["c", "cpp", "java", "python", "javascript"],
                required: true,
                trim: true
            },
            headerCode: {
                type: String,
                trim: true
            },
            code: {
                type: String,
                required: true,
                trim: true
            },
            mainCode: {
                type: String,
                trim: true
            }
        }
    ],
    examples: [
        {
            input: {
                type: String,
                required: true,
                trim: true
            },
            output: {
                type: String,
                trim: true
            },
            explanation: {
                type: String,
                required: true,
                trim: true
            }
        }
    ],
    visibleTestCases: [
        {
            input: {
                type: String,
                required: true,
                trim: true
            },
            output: {
                type: String,
                trim: true
            }
        }
    ],
    hiddenTestCases: [
        {
            input: {
                type: String,
                required: true,
                trim: true
            },
            output: {
                type: String,
                trim: true
            }
        }
    ],
    referenceSolution: [
        {
            language: {
                type: String,
                enum: ["c", "cpp", "java", "python", "javascript"],
                required: true,
                trim: true
            },
            solutionCode: {
                type: String,
                required: true,
                trim: true
            }
        }
    ],
    problemCreator: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    likes: {
        type: Number,
        min: 0,
        default: 0
    },
    companies: {
        type: [String]
    },
    hints: {
        type: [String]
    },
    comments: {
        type: [comments]
    }
}, {
    timestamps: true 
});


// creating new collection "problems"
const Problem = mongoose.model("problems", problemSchema);

module.exports = Problem;