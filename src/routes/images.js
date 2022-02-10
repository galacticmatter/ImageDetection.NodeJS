const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");
const Image = require("../models/image");
const storageHelper = require("../helpers/storage");
const { detectObjectsByImage, filterDetectionsByConfidence } = require("../services/detection");
const { CONFIG } = require("../constants/constants");
const { rootDir } = require("../../.settings.js");

// Configure multer
const uploader = multer({
  storage: storageHelper,
  limits: {
    fileSize: CONFIG.FILE_SIZE_LIMIT
  }
});

// GET: /images
// GET: /images?objects="{objects}"
router.get('/', (request, response) => {
  const { objects } = request.query;
  let query = {};

  // If 'objects' query parameter is passed
  // add 'objects' query clause to MongoDB query object
  if (objects && typeof objects === 'string') {
    query['tags'] = {
      $in: objects.split(',')
    }
  }

  // Query MongoDB for all images
  Image.find(query)
    .select({
      name: 1,
      label: 1,
      description: 1,
      contentType: 1,
      tags: 1
    })
    .exec()
    .then(items => {
      const result = {
        count: items.length,
        images: items.map(image => {
          return {
            name: image.name,
            label: image.label || '',
            description: image.description || '',
            contentType: image.contentType,
            tags: image.tags || []
          }
        })
      }

      response.status(200).json(result);
    })
    .catch(error => {
      const message = `Error occurred during image(s) retrieval: ${error}`;
      console.error(message);
      response.status(500).json({
        error: message
      })
    })
})

// GET: /images/{imageId}
router.get('/:imageId', (request, response) => {
  const { imageId } = request.params;

  // Query MongoDB for image w/ id
  Image.findById(imageId)
    .select('name label description contentType tags')
    .exec()
    .then(item => {
      if (item) {
        const { name, label, description, contentType, tags } = item;
        response.status(200).json({
          name,
          label,
          description,
          contentType,
          tags
        })
      } else {
        response.status(404).json({
          message: `No image was found with id '${imageId}'`
        })
      }
    })
    .catch(error => {
      const message = `Error occurred during retrieval for image with id '${imageId}': ${error}`;
      console.error(message);
      response.status(500).json({
        error: message
      })
    })
})

// POST: /images
router.post('/', uploader.single('image'), async (request, response) => {
  const { label, description, runDetection } = request.body;
  const { file } = request;
  const enableDetection = !!parseInt(runDetection);
  const imagePath = path.join(`${rootDir}/uploads/${file.filename}`);

  // Create new 'Image' model
  let model = new Image({
    _id: new mongoose.Types.ObjectId(),
    name: file.filename,
    label,
    description,
    data: fs.readFileSync(imagePath),
    contentType: file.mimetype
  });

  // If 'enableDetection' is true
  // Run object detection on image data
  if (enableDetection) {
    try {
      // Upload image to Imagga
      const formData = new FormData();
      formData.append("image", fs.createReadStream(imagePath));
      const { result } = await detectObjectsByImage(formData, formData.getBoundary());

      // Send Url to detect objects
      if (result) {
        const detections = result.tags;
        console.log(`Object detections found: ${detections.length}`);

        // Add tags to model if any
        // Filter out tags with a confidence score less than threshold
        if (detections.length > 0) {
          model.tags = filterDetectionsByConfidence(detections);
        }
      }
    } catch (error) {
      console.error(`Error occurred during the Imagga detection process: ${error}`);
    }
  }

  // Save image to MongoDB.
  model
    .save()
    .then(result => {
      // Delete image from local directory upon successful save to MongoDB.
      fs.unlink(imagePath, (error) => {
        if (error) {
          console.error(`Unable to remove image ${file.filename} from local directory: ${error}`);
        } else {
          console.log(`Successfully removed image ${file.filename} from local directory.`);
        }
      });

      response.status(200).json({
        message: "Successfully saved new image to MongoDB!"
      });
    })
    .catch(error => {
      const message = `Error occurred during image save: ${error}`;
      console.error(message);
      response.status(500).json({
        error: message
      });
    });
})

module.exports = router;
