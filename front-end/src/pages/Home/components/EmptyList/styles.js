import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  p {
    text-align: center;
    color: ${({ theme }) => theme.colors.gray.lighter};

    strong {
      color: ${({ theme }) => theme.colors.primary.main}
    }
  }
`;
