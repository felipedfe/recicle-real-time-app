import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  left: 40%;
  bottom: 0;
  width: 140px;
`

const Image = styled.img`
  width: 100%;
`

function PlasticBin() {
  return (
    <Wrapper
      data-type="plastic"
    >
      <Image
        src="images/paper-bin.png"
      />
    </Wrapper>
  )
};

export default PlasticBin;
