const mongoose = require('mongoose');
const {Schema} = mongoose;

const videoSchema = new Schema({
    problem: {
      type: Schema.Types.ObjectId,
      ref: 'problems',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
   },
   cloudinaryPublicId: {
    type: String,
    required: true,
    unique: true
  },
  secureUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String
  },
  duration: {
    type: Number,
    required: true
  },
},{
    timestamps:true
});



const SolutionVideo = mongoose.model("solutionVideo",videoSchema);

module.exports = SolutionVideo;
