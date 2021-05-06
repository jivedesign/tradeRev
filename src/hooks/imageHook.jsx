import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { getImages } from "../Api";

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