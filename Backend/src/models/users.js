const mongoose = require("mongoose");
const { Schema } = mongoose;

const streakSchema = new mongoose.Schema({
  current: {
    type: Number,
    default: 1,
    min: 0
  },
  longest: {
    type: Number,
    default: 1,
    min: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { _id: false }); // Prevents creating a separate _id for the subdocument

const sprint = new mongoose.Schema({
  sprintName: {
    type: String,
    minLength: 1,
    maxLength: 50,
    trim: true
  },
  description: {
    type: String,
    minLength: 1,
    maxLength: 150,
    trim: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  problems: {
    type: [Schema.Types.ObjectId],
    ref: 'problems',
  }
}, { _id: false, timestamps: true });

const checkedProblemSchema = new mongoose.Schema({
    pid: {
        type:Schema.Types.ObjectId,
        ref: 'problems',
    },
    isSolved: {
        type: Boolean,
    },
    submitDate: {
        type: Date,
    }
}, { _id: false });



// schema for users collection in the database "codingPlatform"
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20,
        trim: true, 
    },
    fullName: {
        type: String,
        minLength: 2,
        maxLength: 40, 
        default: null,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        min: 6,
        max: 90,
    },
    profileImageUrl: {
        type: String,
        // set maxlength in future
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        default: null,
        trim: true
    },
    noSolvedProblems: {
        type: Number,
        min: 0,
        default: 0
    },
    checkedProblems: {
        type: [checkedProblemSchema]  
    },
    favouriteProblems: {
        type: [Schema.Types.ObjectId],
        ref: 'problems',
    },
    likedProblems: {
        type: [Schema.Types.ObjectId],
        ref: 'problems',
    },
    bookmarks: {
        type: [sprint]
    },
    points: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    streaks: {
        type: streakSchema,
        required: true,
        default: () => ({})  // ensures default values apply automatically
    }
},{
    timestamps: true
});

// creating new collection "users"
const User = mongoose.model("users", userSchema);

module.exports = User;