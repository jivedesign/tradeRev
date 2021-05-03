export const imageTypes = {
  RAW: "raw",
  FULL: "full",
  REGULAR: "regular",
  SMALL: "small",
  THUMB: "thumb"
};

export const getImageUrls = (imageObjects, type) => {
  return imageObjects.map(imageObject => {
    return imageObject.urls[type];
  })
}