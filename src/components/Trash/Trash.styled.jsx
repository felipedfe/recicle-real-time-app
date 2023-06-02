import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  top: ${(props) => props.position.top}%;
  left: ${(props) => props.position.left}%;
  width: ${(props) => props.width}px;
`;

export const Image = styled.img`
  position: absolute; 
  width: 80%;
`;