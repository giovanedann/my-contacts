import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  input {
    width: 100%;
    background: #fff;
    border: none;
    border-radius: 15px;
    height: 50px;
    outline: 0;
    padding: 0 16px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

    &:focus {
      transform: translateY(-3px);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
    }

    &::placeholder {
      color: #BCBCBC;
      font-size: 16px;
    }
  }
`;
