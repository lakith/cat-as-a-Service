const {
  BASE_URL,
  COLOR_OF_SAMPLE_IMAGE_TEXT,
  HEIGHT_OF_SAMPLE_IMAGE,
  IMAGE_ENCODING_FORMAT,
  SIZE_OF_SAMPLE_IMAGE,
  WIDTH_OF_SAMPLE_IMAGE,
} = require("../constant/constants");

const imageTexts = ["Hello", "You"];

/**
 * Returns sample image dataset.
 */
const getSampleImageDataSet = () => {
  const sampleImageData = imageTexts.map((text) => {
    return {
      url: `${BASE_URL}/${text}?width=${WIDTH_OF_SAMPLE_IMAGE}&height=${HEIGHT_OF_SAMPLE_IMAGE}&color=${COLOR_OF_SAMPLE_IMAGE_TEXT}&size=${SIZE_OF_SAMPLE_IMAGE}`,
      encoding: IMAGE_ENCODING_FORMAT,
    };
  });
  return sampleImageData;
};

module.exports = {
  getSampleImageDataSet,
};
