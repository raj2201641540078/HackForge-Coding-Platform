const cloudinary = require('../../config/cloudinary');

// to generate and send image signature to the client
const getImageSignature = async (req, res) => {
  try {
    const userId = req.payload._id;

    // Generate unique public_id for the image
    const timestamp = Math.round(new Date().getTime() / 1000);
    const publicId = `hackforge-users-profile-images/${userId}_${timestamp}`;
    
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
      upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    };

    res.status(200).json(reply);

  } catch (error) {
    console.error('Error generating upload signature:', error);
    res.status(500).json({ error: 'Failed to generate upload credentials' });
  }
};

module.exports = getImageSignature;

