import React, { useState } from 'react';
import { getImages, getImage } from "../Api";

const useImageHook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imageObjects, setImageObjects] = useState([]);

  const getAndAppendNextImageListPage = async () => {
    setCurrentPage(currentPage + 1);
    
    const nextImageObjects = await getImages(currentPage + 1);
    const newImageObjectsList = imageObjects.concat(nextImageObjects.data);
    setImageObjects(newImageObjectsList)

    return newImageObjectsList;
  };

  return {
    imageObjects,
    getAndAppendNextImageListPage
  }
}

export default useImageHook;