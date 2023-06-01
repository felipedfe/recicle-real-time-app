import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;

  top: ${(props) => props.position.top}%;
  left: ${(props) => props.position.left}%;

  /* width: ${(props) => props.width}px; */
  /* max-width: 140px; */
  width: ${(props) => props.width}px;
`;

const Image = styled.img`
  position: absolute; 
  /* top: ${(props) => props.position.top}%;
  left: ${(props) => props.position.left}%; */
  width: 80%;
  /* margin: auto; */
`;

// podemos setar dados para o objeto que está sendo arrastado usando o dataTransfer
function Trash({ type, sourceImg, top, left, id, socket }) {
  const [position, setPosition] = useState({ top, left })

  const naturalWidth = document.getElementById(id)?.naturalWidth;
  // const teste = naturalWidth?.naturalWidth;
  console.log("-----", naturalWidth)

  const handleOnDrag = (e) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("elementId", e.target.id);
  };

  // const handleDragEnd = ({ clientX, clientY }) => {
  //   setPosition({ top: clientY, left: clientX });

  //   socket.emit("image-move", ({id, clientX, clientY, setPosition}));
  // };

  // console.log(position)

  return (
    <Wrapper width={naturalWidth} position={position}>
      <Image
        className="trash"
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
