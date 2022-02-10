// MongoDB configuration.
const MONGODB = Object.freeze({
  // MongoDB Access Key.
  ACCESS_KEY: process.env.MONGODB_ACCESS_KEY,
  // MongoDB Secret Key.
  SECRET_KEY: process.env.MONGODB_SECRET_KEY,
  // MongoDB uri.
  URI: process.env.MONGODB_URI
})

// Imagga API configuration.
const IMAGGA = Object.freeze({
  // Imagga API key.
  API_KEY: process.env.IMAGGA_API_KEY,
  // Imagga API secret.
  API_SECRET: process.env.IMAGGA_API_SECRET,
  // Imagga API base-64 encoded authorization.
  API_AUTHORIZATION: process.env.IMAGGA_API_AUTHORIZATION,
  // Imagga API base url.
  API_BASE_URL: process.env.IMAGGA_API_BASE_URL,
  // Imagga API version.
  API_VERSION: process.env.IMAGGA_API_VERSION,
  // Imagga API tag detection resource path.
  DETECTION_RESOURCE_PATH: process.env.IMAGGA_DETECTION_RESOURCE_PATH,
  // Imagga API image upload resource path.
  UPLOAD_RESOURCE_PATH: process.env.IMAGGA_UPLOAD_RESOURCE_PATH,
  // Default tag confidence score threshold.  Any tags with a confidence score lower than threshold will be excluded.
  CONFIDENCE_THRESHOLD: process.env.IMAGGA_CONFIDENCE_THRESHOLD
})

// API configuration.
const CONFIG = Object.freeze({
  // Default API port.
  API_PORT: 5000,
  // Default image upload folder.
  IMAGES_FOLDER: "./uploads/",
  // Default file upload limit.
  FILE_SIZE_LIMIT: 1024 * 1024 * 4, // 4 MB
})

module.exports = {
  MONGODB,
  IMAGGA,
  CONFIG
}
