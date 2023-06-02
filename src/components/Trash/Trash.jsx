import React, { useState } from 'react';
import * as s from './Trash.styled';

// podemos setar dados para o objeto que está sendo arrastado usando o dataTransfer
function Trash({ type, sourceImg, top, left, id, socket }) {
  const [position, setPosition] = useState({ top, left })

  // naturalWidth é o tamanho orginal em pixels da imagem. Com ele podemos diminuir as imagens em %
  const naturalWidth = document.getElementById(id)?.naturalWidth;

  const handleOnDrag = (e) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("elementId", e.target.id);
  };

  // const handleDragEnd = ({ clientX, clientY }) => {
  //   setPosition({ top: clientY, left: clientX });

  //   socket.emit("image-move", ({id, clientX, clientY, setPosition}));
  // };

  return (
    <s.Wrapper
      width={naturalWidth}
      position={position}
    >
      <s.Image
        className="trash"
        id={id}
        onDragStart={(e) => handleOnDrag(e)}
        // onDragEnd={(e) => handleDragEnd(e)}
        data-type={type}
        draggable
        alt={type}
        src={sourceImg}
      />
    </s.Wrapper>
  );
}

export default Trash;
