import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  .error-details {
    margin-left: 24px;
    display: flex;
    flex-direction: column;

    strong {
      font-size: 22px;
      color: ${({ theme }) => theme.colors.danger.main};
      margin-bottom: 8px;
    }

    button {
      width: 65%;
    }
  }
`;
