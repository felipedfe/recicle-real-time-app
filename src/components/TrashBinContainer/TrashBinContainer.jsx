import React from 'react';
import TrashBin from '../TrashBin/TrashBin';
import styled from 'styled-components';

const TrashBinSection = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -25%);
  display: flex;
`

function TrashBinContainer({yourScore, setYourScore, socket}) {
  return (
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
  )
}

export default TrashBinContainer;
