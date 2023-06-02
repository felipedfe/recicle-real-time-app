import React from 'react';
import Trash from '../Trash/Trash';
import styled from 'styled-components';

const TrashSection = styled.section`
  position: relative;
  padding-top: 4.5rem;
  height: 100%;
`

function TrashContainer({ socket }) {
  return (
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
  )
};

export default TrashContainer;
