import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { hideTrash } from '../../utils/hideTrash';

const Wrapper = styled.div`
  position: absolute;
  bottom: ${(props) => props.bottom}%;
  left: ${(props) => props.left}%;
  border: solid 2px ${(props) => props.$over ? "#000" : "transparent"};
  width: 140px;
  border-radius: 5px;
`

const Image = styled.img`
  animation-name: ${(props) => props.$dropAnimation.on ? `${props.$dropAnimation.type}` : "none"};
  animation-duration: .2s;
  animation-iteration-count: 2;
  animation-timing-function: steps(2);
  width: 100%;
  border-radius: 5px;

  @keyframes positive {
    0%{background-color: #3fc451;}
    100%{background-color: #fff;}
  }

  @keyframes negative {
    0%{background-color: #e01111;}
    100%{background-color: #fff;}
  }
`

function PlasticBin({ left, bottom, sourceImg, type, socket, yourScore, setYourScore }) {
  const initialState = {
    on: false,
    type: "",
  };

  const [over, setOver] = useState(false);
  const [dropAnimation, setDropAnimation] = useState(initialState);

  const handleOnDrop = (e) => {
    // aqui vamos acessar os dados que foram setados no Trash  (na função handleOnDrag)
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
      socket.emit("hide-trash", { type, elementId })
      setOver(false);
    } else {
      setDropAnimation({
        on: true,
        type: "negative",
      });
      setTimeout(() => setDropAnimation(initialState), 500);
    };
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
    <Wrapper
      bottom={bottom}
      left={left}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      onDragLeave={handleDragLeave}
      $over={over}
    // $dropAnimation={dropAnimation}
    >
      <Image
        data-type={type}
        src={sourceImg}
        $dropAnimation={dropAnimation}
      />
    </Wrapper>
  )
};

export default PlasticBin;
