import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
`;

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
  animation: ${({ isLeaving }) => (isLeaving ? fadeOut : fadeIn)} 0.3s forwards;
`;

export const Container = styled.div`
  width: 95%;
  max-width: 450px;
  background: #FFF;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  animation: ${({ isLeaving }) => (isLeaving ? scaleOut : scaleIn)} 0.3s forwards;

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
