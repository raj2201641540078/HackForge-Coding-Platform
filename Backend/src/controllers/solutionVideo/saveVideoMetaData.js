const cloudinary = require('../../config/cloudinary');
const SolutionVideo = require("../../models/solutionVideo");
const mongoose  = require('mongoose');

const saveVideoMetaData = async (req, res) => {
  try {
    const {
      cloudinaryPublicId,
      secureUrl,
      duration,
    } = req.body;
    const { problemId } = req.params;
    const userId = req.payload._id;

    // verify if given problem id has a valid type
    if (!mongoose.Types.ObjectId.isValid(problemId)) 
        return res.status(400).send({ error: "Invalid Problem ID provided."});

    // Verify the upload with Cloudinary
    const cloudinaryResource = await cloudinary.api.resource(
      cloudinaryPublicId,
      { resource_type: 'video' }
    );

    if (!cloudinaryResource) {
      return res.status(400).json({ error: 'Video not found on Cloudinary' });
    }

    // Check if video already exists for this problem and user
    const existingVideo = await SolutionVideo.findOne({
      problem: problemId
    });

    if (existingVideo) {
      return res.status(409).json({ error: 'Video Solution for the given problem already exists.' });
    }

    const thumbnailUrl = cloudinary.url(cloudinaryResource.public_id, {
    resource_type: 'image',  
    transformation: [
    { width: 400, height: 225, crop: 'fill' },
    { quality: 'auto' },
    { start_offset: 'auto' }  
    ],
    format: 'jpg'
    });

    // Create video solution record
    const videoSolution = await SolutionVideo.create({
      problem: problemId,
      user: userId,
      cloudinaryPublicId,
      secureUrl : cloudinaryResource.secureUrl || secureUrl,
      duration: cloudinaryResource.duration || duration,
      thumbnailUrl
    });


    res.status(201).json({
      message: 'Video solution saved successfully',
      videoSolution: {
        id: videoSolution._id,
        thumbnailUrl: videoSolution.thumbnailUrl,
        duration: videoSolution.duration,
        secureUrl: videoSolution.secureUrl,
        cloudinaryPublicId: videoSolution.cloudinaryPublicId,
        uploadedAt: videoSolution.createdAt
      }
    });

  } catch (error) {
    console.error('Error saving video metadata:', error);
    res.status(500).json({ error: 'Failed to save video metadata' });
  }
};

module.exports = saveVideoMetaData;