import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  width: 100px;
`;

const Image = styled.img`
  width: 100%;
`;

function Trash({ type, sourceImg, top, left }) {
  return (
    <Wrapper
      data-type={type}
      top={top}
      left={left}
    >
      <Image
        alt={type}
        src={sourceImg}
      />
    </Wrapper>
  );
}

export default Trash;
