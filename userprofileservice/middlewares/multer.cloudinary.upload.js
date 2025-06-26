// middleware/multerCloudinary.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary.config.");

// ✅ Profile Picture Uploader
const profileImageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req) => {
    return {
      folder: `uploads/${req.user._id}`,  // folder structure: uploads/<userId>
      public_id: `profile_${Date.now()}`,
      resource_type: "image",
    };
  },
});

const uploadProfileImage = multer({ storage: profileImageStorage });

module.exports = {
  uploadProfileImage
};