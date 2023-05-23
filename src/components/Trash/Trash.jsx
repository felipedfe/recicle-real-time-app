import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;

  width: 100px;
`;

const Image = styled.img`
  position: absolute; 
  top: ${(props) => props.position.top}px;
  left: ${(props) => props.position.left}px;
  width: 100%;
`;

// podemos setar dados para o objeto que está sendo arrastado usando o dataTransfer
function Trash({ type, sourceImg, top, left, id, socket }) {
  const [position, setPosition] = useState({ top, left })

  const handleOnDrag = (e) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("elementId", e.target.id);
    console.log(e.target.id)

    socket.emit("hello", "TESTE!");
  };

  // const handleDragEnd = ({ clientX, clientY }) => {
  //   setPosition({ top: clientY, left: clientX });

  //   socket.emit("image-move", ({id, clientX, clientY, setPosition}));
  // };

  console.log(position)

  return (
    <Wrapper>
      <Image
        id={id}
        onDragStart={(e) => handleOnDrag(e)}
        // onDragEnd={(e) => handleDragEnd(e)}
        data-type={type}
        draggable
        alt={type}
        src={sourceImg}
        position={position}
      />
    </Wrapper>
  );
}

export default Trash;
