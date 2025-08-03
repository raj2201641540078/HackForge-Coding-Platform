const cloudinary = require('../../config/cloudinary');
const Problem = require("../../models/problems");
const SolutionVideo = require('../../models/solutionVideo');
const mongoose  = require('mongoose');

// to generate and send video signature to the client
const getVideoSignature = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.payload._id;

    // verify if given problem id has a valid type
    if (!mongoose.Types.ObjectId.isValid(problemId)) 
        return res.status(400).send({ error: "Invalid Problem ID provided."});

    // Verify problem exists
    const problem = await Problem.findById(problemId);
    if (!problem) 
      return res.status(404).json({ error: 'Problem not found' });

    // Check if video already exists for this problem and user
    const existingVideo = await SolutionVideo.findOne({
      problem: problemId
    });

    if (existingVideo) {
      return res.status(409).json({ error: 'Video Solution for the given problem already exists.' });
    }

    // Generate unique public_id for the video
    const timestamp = Math.round(new Date().getTime() / 1000);
    const publicId = `hackforge-solutions/${problemId}/${userId}_${timestamp}`;
    
    // Upload parameters
    const uploadParams = {
      timestamp: timestamp,
      public_id: publicId,
    };

    // Generate signature
    const signature = cloudinary.utils.api_sign_request(
      uploadParams,
      process.env.CLOUDINARY_API_SECRET
    );

    const reply = {
      signature,
      timestamp,
      public_id: publicId,
      api_key: process.env.CLOUDINARY_API_KEY,
      upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
    };

    res.status(200).json(reply);

  } catch (error) {
    console.error('Error generating upload signature:', error);
    res.status(500).json({ error: 'Failed to generate upload credentials' });
  }
};

module.exports = getVideoSignature;

