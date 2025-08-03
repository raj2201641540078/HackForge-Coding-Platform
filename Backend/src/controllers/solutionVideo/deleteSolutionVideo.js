const cloudinary = require('../../config/cloudinary');
const SolutionVideo = require("../../models/solutionVideo");

const deleteSolutionVideo = async (req, res) => {
  try {
    const { problemId } = req.params;

    // verify if given problem id has a valid type
    if (!mongoose.Types.ObjectId.isValid(problemId)) 
        return res.status(400).send({ error: "Invalid Problem ID provided."});

    const video = await SolutionVideo.findOneAndDelete({ problemId });

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    await cloudinary.uploader.destroy(video.cloudinaryPublicId, { resource_type: 'video' , invalidate: true });

    res.json({ message: 'Video deleted successfully' });

  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ error: 'Failed to delete video' });
  }
};

module.exports = deleteSolutionVideo;