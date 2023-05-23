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

// podemos setar dados para o objeto que está sendo arrastado usando o dataTransfer
function Trash({ type, sourceImg, top, left, id, socket}) {
  const handleOnDrag = (e) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("elementId", e.target.id);
    console.log(e.target.id)

    // const onDragData = {
    //   type,
    //   id,
    // };

    // console.log(socket)
    socket.emit("hello", "TESTE!");
  };

  return (
    <Wrapper
      top={top}
      left={left}
    >
      <Image
        id={id}
        onDragStart={(e) => handleOnDrag(e)}
        data-type={type}
        draggable
        alt={type}
        src={sourceImg}
      />
    </Wrapper>
  );
}

export default Trash;
