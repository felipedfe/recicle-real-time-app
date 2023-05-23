import React, { useState } from 'react';
import styled from 'styled-components';
import { hideTrash } from '../../utils/hideTrash';

const Wrapper = styled.div`
  position: absolute;
  bottom: ${(props) => props.bottom}%;
  left: ${(props) => props.left}%;
  border: solid 2px ${(props) => props.over ? "#000" : "transparent"};
  width: 140px;
`

const Image = styled.img`
  width: 100%;
`

function PlasticBin({ left, bottom, sourceImg, type, socket }) {
  const [over, setOver] = useState(false);

  const handleOnDrop = (e) => {
    // aqui vamos acessar os dados que foram setados no Trash  (na função handleOnDrag)
    const type = e.dataTransfer.getData("type");
    const elementId = e.dataTransfer.getData("elementId");

    // e aqui comparamos o dado transferido como o data-set da lixeira e escondemos
    // o elemento que deu match
    if (type === e.target.dataset.type) {
      hideTrash(elementId);
    };

    socket.emit("hide-trash", { type, elementId })
    setOver(false);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
    setOver(true);
  };

  const handleDragLeave = () => {
    setOver(false);
  };

  return (
    <Wrapper
      bottom={bottom}
      left={left}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      onDragLeave={handleDragLeave}
      over={over}
    >
      <Image
        data-type={type}
        src={sourceImg}
      />
    </Wrapper>
  )
};

export default PlasticBin;
