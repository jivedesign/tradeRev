import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import useImageHook from '../hooks/imageHook';
import ImageTile from './imageTile';
import {getImages} from '../Api';
import FullscreenImage from './fullscreenImage';

const StyledGridContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
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

  const { init, imageObjects, getImageObjects, getNextImageObject, getPrevImageObject } = useImageHook();

  useEffect(() => {
    if (hasInitialized && imageObjects.length) {
      setImages(imageObjects);
      setIsLoading(false);
    };
  }, [hasInitialized, imageObjects]);

  useEffect(() => {
    if (!hasInitialized) {
      setIsLoading(true);

      init();
      setHasInitialized(true);
    }
  }, [hasInitialized]);


  const handleGetImages = async () => {
    const newImages = await getImages(currentPage);
    console.log('-- IMAGES;', images)
    setImages(images.concat(newImages));
  }

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    console.log('- SCR');
    if (bottom) {
      // handleGetImages
      console.log('- BTTOm');
    }
  }

  const handleShowFullscreenImage = (imageObj, index) => {
    setFullscreenImageIndex(index);
    setFullscreenImageObject(imageObj);
    setShowFullscreen(true);
  }

  const handleShowNextFullscreenImage = useCallback(() => {
    const nextImageIndex = fullscreenImageIndex + 1;
    setFullscreenImageIndex(nextImageIndex);

    // const nextImage = getNextImageObject(nextImageIndex);
    
    setFullscreenImageObject(images[nextImageIndex]);
    setShowFullscreen(true);
  }, [setFullscreenImageObject, setShowFullscreen, fullscreenImageIndex])

  const handleShowPrevFullscreenImage = useCallback(() => {
    const prevImageIndex = fullscreenImageIndex - 1;
    setFullscreenImageIndex(prevImageIndex);

    const prevImage = getPrevImageObject(prevImageIndex);
    
    setFullscreenImageObject(prevImage);
    setShowFullscreen(true);
  }, [getNextImageObject, setFullscreenImageObject, setShowFullscreen, fullscreenImageIndex])

  const handleCloseFullscreenImage = useCallback(() => {
    setFullscreenImageObject(null);
    setFullscreenImageIndex(null);
    setShowFullscreen(false);
  }, []);

  return (
    <StyledGridContainer onScroll={handleScroll}>
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
    </StyledGridContainer>
  )

}

export default Grid;