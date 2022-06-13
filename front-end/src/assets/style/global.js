import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Sora', sans-serif;

    input, button {
      font-family: 'Sora', sans-serif;
      font-size: 16px;
    }
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray.darker}
  }

  button {
    cursor: pointer;
  }
`;
