import React, { useEffect } from 'react';
import styled from 'styled-components';
import Trash from './components/Trash/Trash';
import PaperBin from './components/PaperBin/PaperBin';
import PlasticBin from './components/PlasticBin/PlasticBin';
import TrashBin from './components/TrashBin/TrashBin';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:4000');

// console.log(socket);

const Main = styled.main`
  width: 100%;
`;



function App() {

  useEffect(() => {
    socket.on("hello", (arg) => {
      console.log(arg)
    })
  }, [socket])

  const sendMessage = () => {
    // socket.emit("hello", 334);
    // socket.emit("hello", 667);
  };

  // socket.on("connection", () => {
  //   socket.on("hello", (arg) => {
  //     console.log(arg);
  //   });
  // });


  return (
    <Main>
      <button onClick={sendMessage}> Send Message</button>
      <Trash id={1} type="paper" sourceImg="images/paper-1.png" top={5} left={30} socket={socket} />
      <Trash id={2} type="plastic" sourceImg="images/plastic-1.png" top={15} left={10} socket={socket} />
      {/* <PaperBin /> */}
      {/* <PlasticBin /> */}
      <TrashBin
        left={60}
        bottom={0}
        sourceImg="images/plastic-bin.png"
        type="plastic"
      />
      <TrashBin
        left={30}
        bottom={0}
        sourceImg="images/paper-bin.png"
        type="paper"
      />
    </Main>
  );
}

export default App;
