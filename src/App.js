import './App.css';
import styled from 'styled-components';
import Trash from './components/Trash/Trash';
import PaperBin from './components/PaperBin/PaperBin';
import PlasticBin from './components/PlasticBin/PlasticBin';
import TrashBin from './components/TrashBin/TrashBin';

const Main = styled.main`
  width: 100%;
`;

function App() {
  return (
    <Main>
      <Trash id={1} type="paper" sourceImg="images/paper-1.png" top={5} left={30} />
      <Trash id={2} type="plastic" sourceImg="images/plastic-1.png" top={15} left={10} />
      {/* <PaperBin /> */}
      {/* <PlasticBin /> */}
      <TrashBin 
        left={60}
        bottom={0}
        sourceImg="images/plastic-bin.png"
        type="plastic"
      />
    </Main>
  );
}

export default App;
