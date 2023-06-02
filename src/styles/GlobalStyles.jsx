import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }

  html {
    --color-bg: #f98383;
    --color-logo: #e67070;
    --color-score-box: #f6d095;
    --color-score: #2f2f2f;
  }

`
