import React from 'react';
import styled from 'styled-components';

const StyledImageTile = styled.img`
  height: 400px;
  max-width: 600px;
  margin: 5px;
`;

const ImageTile = (props) => {
  const {index, imageData, onClick} = props;

  return (
    <StyledImageTile
      id={imageData.id}
      onClick={() => onClick(imageData, index)}
      src={`${imageData.links.download}`}
    />
  );
}

export default ImageTile;