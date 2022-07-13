import styled from 'styled-components';

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
`;

export const Container = styled.div`
  width: 95%;
  max-width: 450px;
  background: #FFF;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  > h1 {
    color: ${({ theme, danger }) => danger && theme.colors.danger.main};
    font-size: 22px;
  }

  .modal-body {
    margin-top: 32px;
  }
`;

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.gray.lighter};
    margin-right: 24px;

    &[disabled] {
      cursor: not-allowed;
    }
  }
`;
