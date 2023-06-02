import React, { useEffect, useState } from 'react';
import { hideTrash } from '../../utils/hideTrash';
import * as s from './TrashBin.styled';

function TrashBin(
  { 
    sourceImg,
    type,
    socket,
    yourScore,
    setYourScore,
  }
) {

  const initialState = {
    on: false,
    type: "",
  };

  const [over, setOver] = useState(false);
  const [dropAnimation, setDropAnimation] = useState(initialState);

  const handleOnDrop = (e) => {
    // aqui vamos acessar os dados que foram setados no Trash (na função handleOnDrag)
    const type = e.dataTransfer.getData("type");
    const elementId = e.dataTransfer.getData("elementId");

    // e aqui comparamos o dado transferido como o data-set da lixeira e escondemos
    // o elemento que deu match
    if (type === e.target.dataset.type) {
      setYourScore((prevState) => prevState + 1);
      hideTrash(elementId);
      setDropAnimation({
        on: true,
        type: "positive",
      });
      setTimeout(() => setDropAnimation(initialState), 500);
      socket.emit("hide-trash", { type, elementId });
    } else {
      setDropAnimation({
        on: true,
        type: "negative",
      });
      setTimeout(() => setDropAnimation(initialState), 500);
    };
    setOver(false);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
    setOver(true);
  };

  const handleDragLeave = () => {
    setOver(false);
  };

  useEffect(() => {
    socket.emit("opponent-scored", yourScore);
  }, [yourScore]);

  // o dollar sign nas propriedades $over e $dropAnimation serve pra diferenciar 
  // uma prop de um styled component de uma propriedade do DOM
  return (
    <s.Wrapper
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      onDragLeave={handleDragLeave}
      $over={over}
    >
      <s.Image
        data-type={type}
        src={sourceImg}
        $dropAnimation={dropAnimation}
      />
    </s.Wrapper>
  )
};

export default TrashBin;
