import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  left: 60%;
  bottom: 0;
  width: 140px;
`

const Image = styled.img`
  width: 100%;
`

function PlasticBin() {
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
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
    >
      <Image
        data-type="plastic"
        src="images/plastic-bin.png"
      />
    </Wrapper>
  )
};

export default PlasticBin;