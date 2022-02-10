const multer = require("multer");
const { CONFIG } = require("../constants/constants");

const storage = multer.diskStorage({
  // Edit the destination folder of the uploaded file.
  destination: (request, file, callback) => {
    callback(null, CONFIG.IMAGES_FOLDER);
  },

  // Edit the generated name of the uploaded file.
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  }
})

module.exports = storage;
