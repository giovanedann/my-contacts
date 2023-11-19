import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  margin-top: 32px;

  span {
    margin-left: 24px;
    color: ${({ theme }) => theme.colors.gray.lighter};
    max-width: 400px;
    word-break: break-word;
  }
`;
