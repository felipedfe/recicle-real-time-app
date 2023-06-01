import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Trash from './components/Trash/Trash';
import TrashBin from './components/TrashBin/TrashBin';
import { io } from 'socket.io-client';
import { hideTrash } from './utils/hideTrash';
import { GlobalStyles } from './styles/GlobalStyles';
import './App.css';

const socket = io('http://localhost:4000');

// isso é para anular a animação do "fantasma" da imagem quando movemos ela de lugar
document.ondragover = (e) => {
  // e.preventDefault();
}

const Main = styled.main`
  /* background-color: var(--color-bg); */
  width: 100%;
  /* height: 100vh; */
  max-width: 1400px;
  max-height: 800px;
  margin: auto;
`;

const Board = styled.section`
  height: 100vh;

`

const ScoreSection = styled.section`
  position: absolute;
  z-index: 1;
  /* background-color: aqua; */
  width: 100%;
  max-width: 1400px;
  height: 4rem;
`

const TrashSection = styled.section`
  position: relative;
  /* background-color: #f98383; */
  background-color: var(--color-bg);
  /* height: 92vh; */
  /* max-height: 800px; */
  padding-top: 4rem;
  height: 100%;
`

const TrashBinSection = styled.section`
  position: relative;
  /* height: 100vh; */
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
        <ScoreSection>
          Pontuação:
          <p>Você - {yourScore}</p>
          <p>Oponente - {opponentScore}</p>
        </ScoreSection>
        <Board>
          <TrashSection>
            <Trash id={2} type="plastic" sourceImg="images/plastic/garrafa-pet.png" top={10} left={10} socket={socket} />
            <Trash id={10} type="plastic" sourceImg="images/plastic/saco.png" top={45} left={5} socket={socket} />
            <Trash id={13} type="plastic" sourceImg="images/plastic/amaciante.png" top={10} left={80} socket={socket} />
            <Trash id={1} type="paper" sourceImg="images/paper/papel.png" top={3} left={45} socket={socket} />
            <Trash id={15} type="paper" sourceImg="images/paper/caixa.png" top={0} left={20} socket={socket} />
            <Trash id={16} type="paper" sourceImg="images/paper/jornal.png" top={25} left={5} socket={socket} />
            <Trash id={3} type="not-recyclable" sourceImg="images/not-recyclable/spray.png" top={5} left={30} socket={socket} />
            <Trash id={4} type="not-recyclable" sourceImg="images/not-recyclable/oculos.png" top={40} left={10} socket={socket} />
            <Trash id={9} type="not-recyclable" sourceImg="images/not-recyclable/esponja.png" top={70} left={5} socket={socket} />
            <Trash id={6} type="not-recyclable" sourceImg="images/not-recyclable/lata-tinta.png" top={5} left={90} socket={socket} />
            <Trash id={12} type="not-recyclable" sourceImg="images/not-recyclable/porcelana.png" top={5} left={75} socket={socket} />
            <Trash id={1} type="not-recyclable" sourceImg="images/not-recyclable/clipes.png" top={0} left={55} socket={socket} />
            <Trash id={5} type="metal" sourceImg="images/metal/lata-refri.png" top={0} left={70} socket={socket} />
            <Trash id={11} type="metal" sourceImg="images/metal/ferramenta.png" top={70} left={80} socket={socket} />
            <Trash id={8} type="metal" sourceImg="images/metal/parafusos.png" top={35} left={80} socket={socket} />
            <Trash id={7} type="glass" sourceImg="images/glass/remedios.png" top={40} left={90} socket={socket} />
            <Trash id={14} type="glass" sourceImg="images/glass/cacos.png" top={70} left={85} socket={socket} />
          </TrashSection>
          <TrashBinSection>
            <TrashBin
              left={60}
              bottom={0}
              sourceImg="images/trash-bins/plastico.png"
              type="plastic"
              yourScore={yourScore}
              setYourScore={setYourScore}
              socket={socket}
            />
            <TrashBin
              left={30}
              bottom={0}
              sourceImg="images/trash-bins/papel.png"
              type="paper"
              yourScore={yourScore}
              setYourScore={setYourScore}
              socket={socket}
            />
            <TrashBin
              left={50}
              bottom={0}
              sourceImg="images/trash-bins/metal.png"
              type="metal"
              yourScore={yourScore}
              setYourScore={setYourScore}
              socket={socket}
            />
            <TrashBin
              left={70}
              bottom={0}
              sourceImg="images/trash-bins/vidro.png"
              type="glass"
              yourScore={yourScore}
              setYourScore={setYourScore}
              socket={socket}
            />
            <TrashBin
              left={80}
              bottom={0}
              sourceImg="images/trash-bins/nao-reciclavel.png"
              type="not-recyclable"
              yourScore={yourScore}
              setYourScore={setYourScore}
              socket={socket}
            />
          </TrashBinSection>
        </Board>
      </Main>
    </>
  );
}

export default App;
