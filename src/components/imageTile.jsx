import React from 'react';
import styled from 'styled-components';

const StyledImageTileContainer = styled.div`
  height: 300px;
  width: 300px;
  margin: 5px;
  background: black;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const StyledImageTile = styled.img`
  max-height: 300px;
  max-width: 300px;
`;

const ImageTile = (props) => {
  const {index, imageData, onClick} = props;

  return (
    <StyledImageTileContainer id={imageData.id} onClick={() => onClick(imageData, index)}>
      <StyledImageTile
        src={`${imageData.links.download}`}
      />
    </StyledImageTileContainer>
  );
}

export default ImageTile;