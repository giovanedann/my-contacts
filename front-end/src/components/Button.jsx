import styled, { css } from 'styled-components';

export default styled.button`
  height: 52px;
  border: none;
  border-radius: 4px;
  padding: 16px;
  font-weight: 600;
  color: #FFF;
  background: ${({ theme }) => theme.colors.primary.main};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  transition: 0.2s ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray.lighter};
    cursor: default;
  }

  ${({ theme, danger }) => danger && css`
    background-color: ${theme.colors.danger.main};

    &:hover {
    background: ${theme.colors.danger.light};
    }

    &:active {
      background: ${theme.colors.danger.dark};
    }
  `}
`;
