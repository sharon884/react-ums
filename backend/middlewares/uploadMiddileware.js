const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Files will be stored in the 'uploads/' folder
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.profile}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);
  
    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only images (JPEG, PNG, JPG) are allowed!"));
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
    fileFilter: fileFilter,
  });
  
  module.exports = upload;