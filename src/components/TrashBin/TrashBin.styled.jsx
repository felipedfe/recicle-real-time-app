import styled from 'styled-components';

export const Wrapper = styled.div`
  border: solid 2px ${(props) => props.$over ? "#000" : "transparent"};
  width: 125px;
  border-radius: 5px;
`

export const Image = styled.img`
  animation-name: ${(props) => props.$dropAnimation.on ? `${props.$dropAnimation.type}` : "none"};
  animation-duration: .2s;
  animation-iteration-count: 2;
  animation-timing-function: steps(2);
  width: 100%;
  border-radius: 5px;

  @keyframes positive {
    0%{background-color: #1bb32f;}
    100%{background-color: #fff;}
  }

  @keyframes negative {
    0%{background-color: #e01111;}
    100%{background-color: #fff;}
  }
`