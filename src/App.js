import './App.css';
import styled from 'styled-components';
import Trash from './components/Trash/Trash';
import PaperBin from './components/PaperBin/PaperBin';

const Main = styled.main`
  width: 100%;
`;

function App() {
  return (
    <Main>
      <Trash type="paper" sourceImg="images/paper-1.png" top={5} left={30}/>
      <Trash type="paper" sourceImg="images/plastic-1.png" top={15} left={10}/>
      <PaperBin />
    </Main>
  );
}

export default App;
