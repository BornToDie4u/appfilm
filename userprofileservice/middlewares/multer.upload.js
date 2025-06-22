const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // each user gets their own folder:  /public/uploads/<userId>/
    const userDir = path.join(__dirname, "../public/uploads", req.user._id.toString());//need to change multer change them as well
    fs.mkdirSync(userDir, { recursive: true });
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now();
    cb(null, `${uniquePrefix}_${file.originalname}`);
  },
});

module.exports = multer({ storage });