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

const ScoreSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 4.5rem;
`

const ScoreBox = styled.div`
  background-color: var(--color-score-box);
  width: 200px;
  padding: 0.3rem;
  text-align: center;
  color: var(--color-score);
`

const TrashSection = styled.section`
  position: relative;
  padding-top: 4.5rem;
  height: 100%;
`

const TrashBinSection = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -25%);
  display: flex;
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
          <ScoreSection>
            <ScoreBox>
              Você : {yourScore}
            </ScoreBox>
            <ScoreBox>
              Oponente : {opponentScore}
            </ScoreBox>
          </ScoreSection>
          <TrashSection>
            <Trash id={2} type="plastic" sourceImg="images/plastic/garrafa-pet.png" top={10} left={13} socket={socket} />
            <Trash id={10} type="plastic" sourceImg="images/plastic/saco.png" top={45} left={5} socket={socket} />
            <Trash id={13} type="plastic" sourceImg="images/plastic/amaciante.png" top={10} left={80} socket={socket} />
            <Trash id={1} type="paper" sourceImg="images/paper/papel.png" top={3} left={45} socket={socket} />
            <Trash id={15} type="paper" sourceImg="images/paper/caixa.png" top={0} left={20} socket={socket} />
            <Trash id={16} type="paper" sourceImg="images/paper/jornal.png" top={25} left={5} socket={socket} />
            <Trash id={3} type="not-recyclable" sourceImg="images/not-recyclable/spray.png" top={0} left={35} socket={socket} />
            <Trash id={4} type="not-recyclable" sourceImg="images/not-recyclable/oculos.png" top={40} left={10} socket={socket} />
            <Trash id={9} type="not-recyclable" sourceImg="images/not-recyclable/esponja.png" top={70} left={5} socket={socket} />
            <Trash id={6} type="not-recyclable" sourceImg="images/not-recyclable/lata-tinta.png" top={5} left={90} socket={socket} />
            <Trash id={12} type="not-recyclable" sourceImg="images/not-recyclable/porcelana.png" top={5} left={75} socket={socket} />
            <Trash id={17} type="not-recyclable" sourceImg="images/not-recyclable/clipes.png" top={0} left={55} socket={socket} />
            <Trash id={5} type="metal" sourceImg="images/metal/lata-refri.png" top={0} left={70} socket={socket} />
            <Trash id={11} type="metal" sourceImg="images/metal/ferramenta.png" top={70} left={80} socket={socket} />
            <Trash id={8} type="metal" sourceImg="images/metal/parafusos.png" top={35} left={80} socket={socket} />
            <Trash id={7} type="glass" sourceImg="images/glass/remedios.png" top={40} left={90} socket={socket} />
            <Trash id={14} type="glass" sourceImg="images/glass/cacos.png" top={70} left={85} socket={socket} />
          </TrashSection>
          <TrashBinSection>
            <TrashBin
              sourceImg="images/trash-bins/plastico.png"
              type="plastic"
              yourScore={yourScore}
              setYourScore={setYourScore}
              socket={socket}
            />
            <TrashBin
              sourceImg="images/trash-bins/papel.png"
              type="paper"
              yourScore={yourScore}
              setYourScore={setYourScore}
              socket={socket}
            />
            <TrashBin
              sourceImg="images/trash-bins/metal.png"
              type="metal"
              yourScore={yourScore}
              setYourScore={setYourScore}
              socket={socket}
            />
            <TrashBin
              sourceImg="images/trash-bins/vidro.png"
              type="glass"
              yourScore={yourScore}
              setYourScore={setYourScore}
              socket={socket}
            />
            <TrashBin
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
