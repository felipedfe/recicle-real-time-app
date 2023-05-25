import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Trash from './components/Trash/Trash';
import TrashBin from './components/TrashBin/TrashBin';
import { io } from 'socket.io-client';
import { hideTrash } from './utils/hideTrash';
import './App.css';

const socket = io('http://localhost:4000');

// isso é para anular a animação do "fantasma" da imagem quando movemos ela de lugar
document.ondragover = (e) => {
  // e.preventDefault();
}

const Main = styled.main`
  width: 100%;
`;

function App() {
  const [yourScore, setYourScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  useEffect(() => {
    socket.on("hello", (arg) => {
      console.log(arg)
    });

    socket.on("hide-trash", (arg) => {
      console.log(arg)
      const { elementId } = arg;
      hideTrash(elementId);
    });

    socket.on("opponent-scored", (arg) => {
      setOpponentScore(arg);
    });

    // socket.on("image-move", (arg => {
    //   const { id, clientY, clientX } = arg;
    //   const element = document.getElementById(id);
    //   console.log(element.dataset)
    //   // element.position = { clientY, clientX };
    // }));
  }, [socket]);

  return (
    <Main>
      <section>
        Pontuação:
        <p>Você - {yourScore}</p>
        <p>Oponente - {opponentScore}</p>
      </section>
      <Trash id={1} type="paper" sourceImg="images/paper-1.png" top={50} left={2} socket={socket} />
      <Trash id={2} type="plastic" sourceImg="images/plastic-1.png" top={70} left={300} socket={socket} />

      <TrashBin
        left={60}
        bottom={0}
        sourceImg="images/plastic-bin.png"
        type="plastic"
        yourScore={yourScore}
        setYourScore={setYourScore}
        socket={socket}
      />
      <TrashBin
        left={30}
        bottom={0}
        sourceImg="images/paper-bin.png"
        type="paper"
        yourScore={yourScore}
        setYourScore={setYourScore}
        socket={socket}
      />
    </Main>
  );
}

export default App;
