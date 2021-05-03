import React from 'react';
import styled from 'styled-components';

const StyledControl = styled.div`
  padding: 10px;
  cursor: pointer;
  color: white;
`;

const Control = (props) => {
  const {children, onControlClick} = props;
  
  return (
    <StyledControl onClick={onControlClick}>{children}</StyledControl>
  )

}

export default Control;