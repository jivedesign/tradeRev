import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Control from './control';

const StyledFullScreenImageContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  background: rgb(0,0,0,0.8);
`;

const StyledFullscreenImage = styled.img`
  max-height: 90%;  
  max-width: 90%;
  margin: 20px 50px 50px 50px;
`;

const StyledControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const StyledCloseButton = styled.div`
  display: block;
  color: white;
  cursor: pointer;
  margin: 10px;
`;

const FullscreenImage = (props) => {
  const { imageObjects, currentImageIndex, onCloseClick, onNextClick, onPrevClick } = props;

  const [imageIndex, setImageIndex] = useState(null);
  const [currentImage, setCurrentImage] = useState(imageObjects[currentImageIndex]);

  useEffect(() => {
    if (currentImageIndex) {
      setImageIndex(currentImageIndex);
      setCurrentImage(imageObjects[currentImageIndex]);
    }
    }, [currentImageIndex, imageObjects]);

  const handleControlClick = useCallback((direction) => {
    let nextIndex;
    if (imageIndex === imageObjects.length - 1 && direction === 'next') {
      nextIndex = 0;
    } else if (imageIndex === 0 && direction === 'prev') {
      nextIndex = imageObjects.length - 1;
    } else {
      nextIndex = direction === 'next' ? imageIndex + 1 : imageIndex - 1;
    }

    setImageIndex(nextIndex);
    setCurrentImage(imageObjects[nextIndex]);
  }, [imageIndex, imageObjects]);

  return (
    <StyledFullScreenImageContainer>
      <StyledControlBar>
        <Control onControlClick={() => handleControlClick('prev')}>Prev</Control>
        <p>Photo {imageIndex + 1} of {imageObjects.length}</p>
        <StyledCloseButton onClick={onCloseClick}>Close</StyledCloseButton>
        <Control onControlClick={() => handleControlClick('next')}>Next</Control>
      </StyledControlBar>
      {currentImage && <StyledFullscreenImage src={currentImage.urls.regular} />}
    </StyledFullScreenImageContainer>
  );
}

export default FullscreenImage;