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
  max-height: 80%;  
  max-width: 80%;
`;

const StyledControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  text-transform: uppercase;
  left: 0;
  right: 0;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledFullscreenBaseLayer = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledPhotoDescription = styled.div`
  text-align: center;
  color: white;
  margin-top: 10px;
`;

const StyledCloseButton = styled.div`
  display: block;
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
`;

const FullscreenImage = (props) => {
  const { imageObjects, currentImageIndex, onCloseClick } = props;

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

  const handleCloseClick = () => {
    onCloseClick(currentImage.id);
  }

  return (
    <StyledFullScreenImageContainer>
      <StyledFullscreenBaseLayer>
        <StyledCloseButton onClick={handleCloseClick}>Close</StyledCloseButton>
          <StyledPhotoDescription>
          <div>[{imageIndex + 1}/{imageObjects.length}] - {currentImage.alt_description}</div>
        </StyledPhotoDescription>
        {currentImage && (
          <StyledControlBar>
            <Control onControlClick={() => handleControlClick('prev')}>Prev</Control>
            <StyledFullscreenImage src={currentImage.urls.regular} />
            <Control onControlClick={() => handleControlClick('next')}>Next</Control>
          </StyledControlBar>
        )}
      </StyledFullscreenBaseLayer>
    </StyledFullScreenImageContainer>
  );
}

export default FullscreenImage;