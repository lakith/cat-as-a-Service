const { getSampleImageDataSet } = require("./data/sampleImages");
const {
  bindImagesAndSave,
  fetchImage,
  getImageBufferArray,
} = require("./services/images");

const blendImages = async () => {
  const sampleImages = getSampleImageDataSet();
  try {
    const images = await Promise.all(
      sampleImages.map((singleImageData) => fetchImage(singleImageData))
    );
    const imageBufferData = getImageBufferArray(images);
    bindImagesAndSave(imageBufferData);
  } catch (e) {
    // TODO: can be improve logging using a populer logging library like winsten by defining log format and log levels
    console.error("Process Existed With Errors. \n", e);
  }
};

blendImages();
