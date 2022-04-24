const {
  DEFAULT_OUTPUT_IMAGE_NAME,
  IMAGE_ENCODING_FORMAT,
  WIDTH_OF_SAMPLE_IMAGE,
  HEIGHT_OF_SAMPLE_IMAGE,
  FORMAT_OF_FINAL_IMAGE,
} = require("../constant/constants");

const axios = require("axios").default;
const blend = require("@mapbox/blend");
const { join } = require("path");
const { writeFile } = require("fs");
const { v4: uuidv4 } = require("uuid");

/**
 * Returns image data in array buffer format.
 *
 * @param {Object} imageData This contains the image url to fetch (imageData.url - string)
 */
const fetchImage = async (imageData) => {
  if (!imageData.url) {
    throw new Error("Image Url Should'nt be null");
  }
  const config = {
    responseType: "arraybuffer",
  };
  try {
    const response = await axios.get(imageData.url, config);
    return response.data;
  } catch (e) {
    throw new Error("Image Fetch Failed");
  }
};

/**
 * Returns array buffer string to new Buffer
 *
 * @param {Array} images list of array buffer strings
 */
const getImageBufferArray = (images) => {
  return images.map((image, index) => {
    if (index > 0) {
      return {
        buffer: Buffer.from(image, IMAGE_ENCODING_FORMAT),
        x: WIDTH_OF_SAMPLE_IMAGE,
        y: 0,
      };
    }
    return {
      buffer: Buffer.from(image, IMAGE_ENCODING_FORMAT),
      x: 0,
      y: 0,
    };
  });
};

/**
 * Return void
 * merge 2 images into one and save it in the file system
 *
 * @param {Array} imageBufferArray Array of Images in Buffer format
 * @param {number} width width of the final image
 * @param {number} height height of the final image
 * @param {string} format format of the final image
 * @param {string} outputName name of the final image
 */
const bindImagesAndSave = (
  imageBufferArray,
  width = WIDTH_OF_SAMPLE_IMAGE * 2,
  height = HEIGHT_OF_SAMPLE_IMAGE,
  format = FORMAT_OF_FINAL_IMAGE,
  outputName = DEFAULT_OUTPUT_IMAGE_NAME
) => {
  if (!imageBufferArray.length) {
    throw new Error("At Least one image is required for this process");
  }
  const imageSettings = {
    width,
    height,
    format,
  };

  blend(imageBufferArray, imageSettings, (err, result) => {
    if (err && !result) {
      throw new Error("Image Blending falied");
    }
    saveImage(result, outputName);
  });
};

/**
 * Return void
 * save the image into the file system
 *
 * @param {string} data data to save.
 * @param {string} outputName name of the final image
 */
const saveImage = (data, outputName) => {
  if (outputName === DEFAULT_OUTPUT_IMAGE_NAME) {
    outputName = `${uuidv4()}-${outputName}`;
  }
  const fileOut = join(process.cwd(), `/${outputName}`);
  writeFile(fileOut, data, "binary", (err) => {
    if (err) {
      throw new Error("Image Save Failed");
    }
    console.info("The file was saved!");
  });
};

module.exports = {
  fetchImage,
  getImageBufferArray,
  bindImagesAndSave,
};
