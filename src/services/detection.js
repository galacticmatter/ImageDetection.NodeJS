const httpRequest = require("../helpers/http/request");
const { IMAGGA } = require("../constants/constants");

let baseUri = `${IMAGGA.API_BASE_URL}/${IMAGGA.API_VERSION}`;

const detectObjectsByImage = async (data, boundary) => {
  const uri = `${baseUri}/${IMAGGA.DETECTION_RESOURCE_PATH}`;
  try {
    console.log('Running detection on image.');
    const detections = await httpRequest('POST', uri, data, {
      'Authorization': `Basic ${IMAGGA.API_AUTHORIZATION}`,
      'Content-Type': `multipart/form-data; boundary=${boundary}`
    });

    return detections;
  } catch (error) {
    console.error(`Error occurred during object detection: ${error}`);
    return null;
  }
}

const detectObjectsById = async (imageId) => {
  const uri = `${baseUri}/${IMAGGA.DETECTION_RESOURCE_PATH}/${imageId}`;
  try {
    console.log(`Running detection on image with id ${imageId}`);
    const detections = await httpRequest('GET', uri, null, {
      'Authorization': `Basic ${IMAGGA.API_AUTHORIZATION}`,
      'Content-Type': 'application/json'
    });

    return detections;
  } catch (error) {
    console.error(`Error occurred during object detection: ${error}`);
    return null;
  }
}

const uploadImage = async (data, boundary) => {
  const uri = `${baseUri}/${IMAGGA.UPLOAD_RESOURCE_PATH}`;
  try {
    console.log('Uploading new image to Imagga.');
    const response = await httpRequest('POST', uri, data, {
      'Authorization': `Basic ${IMAGGA.API_AUTHORIZATION}`,
      'Content-Type': `multipart/form-data; boundary=${boundary}`
    });

    console.log('Upload response: ', JSON.stringify(response));
    return response;
  } catch (error) {
    console.error(`Error occurred during image upload: ${error}`);
    return null;
  }
}

// This could potentially be improved.
// Perhaps using Binary Search.
const filterDetectionsByConfidence = (detections) => {
  return detections.reduce((tags, detection) => {
    if (detection.confidence >= IMAGGA.CONFIDENCE_THRESHOLD) {
      tags.push(detection.tag.en);
    }

    return tags;
  }, []);
}

module.exports = {
  detectObjectsById,
  detectObjectsByImage,
  filterDetectionsByConfidence,
  uploadImage
}
