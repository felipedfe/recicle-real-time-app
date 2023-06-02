import React from 'react';
import styled from 'styled-components';

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

function Score({ yourScore, opponentScore }) {
  return (
    <ScoreSection>
      <ScoreBox>
        Você : {yourScore}
      </ScoreBox>
      <ScoreBox>
        Oponente : {opponentScore}
      </ScoreBox>
    </ScoreSection>
  )
};

export default Score;
