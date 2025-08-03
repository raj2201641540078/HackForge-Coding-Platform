const cloudinary = require('../../config/cloudinary');

const saveImageMetaData = async (req, res) => {
  try {
    const { cloudinaryPublicId, secureUrl } = req.body;
    const { user } = req;

    // Verify the upload with Cloudinary
    const cloudinaryResource = await cloudinary.api.resource(
      cloudinaryPublicId,
      { resource_type: 'image' }
    );

    if (!cloudinaryResource) {
      return res.status(400).json({ error: 'Profile Image not found on Cloudinary' });
    }

    user.profileImageUrl = secureUrl;

    await user.save();

    res.status(200).json({
      message: 'Profile Image saved successfully',
      profileImageUrl: user.profileImageUrl
    });

  } catch (error) {
    console.error('Error saving profile image metadata:', error);
    res.status(500).json({ error: 'Failed to save profile image metadata' });
  }
};

module.exports = saveImageMetaData;