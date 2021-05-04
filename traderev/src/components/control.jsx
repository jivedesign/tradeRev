import React from 'react';
import styled from 'styled-components';

const StyledControl = styled.div`
  cursor: pointer;
  color: white;
  padding: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: all 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const Control = (props) => {
  const {children, onControlClick} = props;
  
  return (
    <StyledControl onClick={onControlClick}>{children}</StyledControl>
  )

}

export default Control;