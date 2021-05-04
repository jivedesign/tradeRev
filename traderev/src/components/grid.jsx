import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import useImageHook from '../hooks/imageHook';
import ImageTile from './imageTile';
import {getImages} from '../Api';
import FullscreenImage from './fullscreenImage';

const StyledGridContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  overflow: scroll;
`;

const StyledGrid = styled.div`
width: 100%;
@media screen and (min-width: 1000px) {
  width: 1200px;
  margin: 0 auto;
}
`;

const LoadingComponent = styled.div`
  font-weight: bold;
  font-size: 50px;
  margin: 100px;
`;

const Grid = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenImageObject, setFullscreenImageObject] = useState(null);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);

  const listInnerRef = useRef();

  const { imageObjects, getAndAppendNextImageListPage, getNextImageObject, getPrevImageObject } = useImageHook();

  useEffect(() => {
    if (hasInitialized && imageObjects) {
      setImages(imageObjects);
      setIsLoading(false);
    };
  }, [hasInitialized, imageObjects]);

  useEffect(() => {
    if (!hasInitialized) {
      setIsLoading(true);

      getAndAppendNextImageListPage();
      setHasInitialized(true);
    }
  }, [hasInitialized]);

  const handleScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        handleGetImages();
      }
    }
  }

  const handleGetImages = async () => {
    getAndAppendNextImageListPage();
  }

  const handleShowFullscreenImage = (imageObj, index) => {
    setFullscreenImageIndex(index);
    setFullscreenImageObject(imageObj);
    setShowFullscreen(true);
  }

  const jumpToPhotoInGrid = (imageId) => {
      var top = document.getElementById(imageId).offsetTop; 
      listInnerRef.current.scrollTo(0, top);
  }

  const handleCloseFullscreenImage = useCallback((imageId) => {
    setFullscreenImageObject(null);
    setFullscreenImageIndex(null);
    setShowFullscreen(false);
    jumpToPhotoInGrid(imageId);
  }, []);

  return (
    <StyledGridContainer ref={listInnerRef} onScroll={() => handleScroll()}>
      <StyledGrid>
        {images.map((image, index) => <ImageTile key={image.id} index={index} imageData={image} onClick={handleShowFullscreenImage} />)}
      </StyledGrid>
      {isLoading && <LoadingComponent>loading...</LoadingComponent>}
      {showFullscreen && (
        <FullscreenImage
          imageObjects={images}
          currentImageIndex={fullscreenImageIndex}
          imageData={fullscreenImageObject}
          onCloseClick={handleCloseFullscreenImage}
        />)
      }
      <LoadingComponent>loading...</LoadingComponent>
    </StyledGridContainer>
  )

}

export default Grid;