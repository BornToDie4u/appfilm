// ✅ Archive Images Uploader
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary.config.");




const archiveImageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: `ArchiveImages/${req.user._id}`,  // folder structure: ArchiveImages/<userId>
      public_id: `archive_${Date.now()}_${file.originalname}`,
      resource_type: "image",
    };
  },
});

const uploadArchives = multer({ storage: archiveImageStorage });

module.exports = {
  uploadArchives
};
