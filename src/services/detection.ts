import httpRequest from "../helpers/http/request";
import { IMAGGA } from "../constants";
import { IDetection } from "../types/detection";

export const detectObjectsByImage = async (data, boundary): Promise<any> => {
  const uri: string = generateApiUrl(IMAGGA.DETECTION_RESOURCE_PATH);
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

export const detectObjectsById = async (imageId): Promise<any> => {
  const uri: string = generateApiUrl(`${IMAGGA.DETECTION_RESOURCE_PATH}/${imageId}`);
  try {
    console.log(`Running detection on image with id ${imageId}`);
    const detections = await httpRequest('GET', uri, null, {
      'Authorization': `Basic ${IMAGGA.API_AUTHORIZATION}`
    });

    return detections;
  } catch (error) {
    console.error(`Error occurred during object detection: ${error}`);
    return null;
  }
}

export const uploadImage = async (data, boundary): Promise<any> => {
  const uri: string = generateApiUrl(IMAGGA.UPLOAD_RESOURCE_PATH);
  try {
    console.log('Uploading new image to Imagga.');
    const response = await httpRequest('POST', uri, data, {
      'Authorization': `Basic ${IMAGGA.API_AUTHORIZATION}`,
      'Content-Type': `multipart/form-data; boundary=${boundary}`
    });

    return response;
  } catch (error) {
    console.error(`Error occurred during image upload: ${error}`);
    return null;
  }
}

// This could potentially be improved.
// Perhaps using Binary Search.
export const filterDetectionsByConfidence = (detections: Array<IDetection>): Array<string> => {
  const threshold: number = Number.parseFloat(IMAGGA.CONFIDENCE_THRESHOLD);
  return detections.reduce((tags, detection) => {
    if (detection.confidence >= threshold) {
      tags.push(detection.tag.en);
    }

    return tags;
  }, []);
}

const generateApiUrl = (resourcePath: string): string => {
  const baseUri: string = `${IMAGGA.API_BASE_URL}/${IMAGGA.API_VERSION}`;
  return `${baseUri}/${resourcePath}`;
}
