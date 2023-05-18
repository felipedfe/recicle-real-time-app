import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  bottom: ${(props) => props.bottom}%;
  left: ${(props) => props.left}%;
  width: 140px;
`

const Image = styled.img`
  width: 100%;
`

function PlasticBin({ left, bottom, sourceImg, type }) {
  const handleOnDrop = (e) => {
    // aqui vamos acessar os dados que foram setados no Trash  (na função handleOnDrag)
    const type = e.dataTransfer.getData("type");

    // e aqui comparamos o dado transferido como o data-set da lixeira e escondemos
    // o elemento que deu match
    if (type === e.target.dataset.type) {
      const elementId = e.dataTransfer.getData("elementId");
      const element = document.getElementById(elementId);
      element.style.display = "none";
    };
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Wrapper
      bottom={bottom}
      left={left}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
    >
      <Image
        data-type={type}
        src={sourceImg}
      />
    </Wrapper>
  )
};

export default PlasticBin;
