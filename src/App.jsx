import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { hideTrash } from './utils/hideTrash';
import { GlobalStyles } from './styles/GlobalStyles';
import TrashContainer from './components/TrashContainer/TrashContainer';
import TrashBinContainer from './components/TrashBinContainer/TrashBinContainer';
import Score from './components/Score/Score';
import './App.css';

const socket = io('http://localhost:4000');

// isso é para anular a animação do "fantasma" da imagem quando movemos ela de lugar
document.ondragover = (e) => {
  // e.preventDefault();
}

const Main = styled.main`
  width: 100%;
`;

const Board = styled.section`
  position: relative;
  height: 100vh;
  max-height: 800px;
  max-width: 1400px;
  margin: auto;
  background-color: var(--color-bg);
`

const RecicleLogo = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-90%);
  font-size: 13rem;
  font-weight: 700;
  color: var(--color-logo);
`

function App() {
  const [yourScore, setYourScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [totalTrash, setTotalTrash] = useState(0);

  // essa primeira verificação do totalTrash ocorre pq ele começa com 0, logo ele cairia
  // no else na primeira renderização
  useEffect(() => {
    if (totalTrash && (yourScore + opponentScore === totalTrash)) {
      if (yourScore > opponentScore) {
        console.log("Você venceu :)");
      } else {
        console.log("Você perdeu :(")
      }
    }
  }, [yourScore, opponentScore]);

  useEffect(() => {
    console.log("TRASH LEFT ===> ", totalTrash);
  }, [totalTrash]);

  useEffect(() => {
    const all = document.querySelectorAll('.trash');
    const allTrash = Array.from(all).length;
    setTotalTrash(allTrash);
  }, []);

  useEffect(() => {
    socket.on("hide-trash", (arg) => {
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
    <>
      <GlobalStyles />
      <Main>
        <Board>
          <RecicleLogo>Recicle</RecicleLogo>
          <Score
            yourScore={yourScore}
            opponentScore={opponentScore}
          />
          <TrashContainer socket={socket} />
          <TrashBinContainer
            yourScore={yourScore}
            setYourScore={setYourScore}
            socket={socket}
          />
        </Board>
      </Main>
    </>
  );
}

export default App;
