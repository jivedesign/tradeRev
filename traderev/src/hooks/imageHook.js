import React, { useState } from 'react';
import { getImages, getImage } from "../Api";

const useImageHook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imageObjects, setImageObjects] = useState([]);

  const getImageObjects = () => {
    return imageObjects;
  }

  const getAndAppendNextImageListPage = async () => {
    setCurrentPage(currentPage + 1);
    
    const nextImageObjects = await getImages(currentPage + 1);
    const newImageObjectsList = imageObjects.concat(nextImageObjects.data);
    setImageObjects(newImageObjectsList)

    return newImageObjectsList;
  };

  const getNextImageListPage = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    
    const nextImageObjects = await getImages(nextPage);

    return nextImageObjects;
  }

  const getNextImageObject = (index) => {
    const nextImage = imageObjects[index];
    return nextImage;
  };

  const getPrevImageObject = (index) => {
    const prevImage = imageObjects[index];
    return prevImage;
  }

  return {
    imageObjects,
    getImageObjects,
    getNextImageListPage,
    getAndAppendNextImageListPage,
    getNextImageObject,
    getPrevImageObject
  }
}

export default useImageHook;