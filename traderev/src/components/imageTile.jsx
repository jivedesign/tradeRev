import React from 'react';
import styled from 'styled-components';

const StyledImageTile = styled.img`
  height: 200px;
  max-width: 400px;
  margin: 5px;
`;

const ImageTile = (props) => {
  const {index, imageData, onClick} = props;

  return <StyledImageTile onClick={() => onClick(imageData, index)} src={`${imageData.links.download}`} />;
}

export default ImageTile;