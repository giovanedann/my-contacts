import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  position: relative;
`;

export const ContactsListHeader = styled.header`
  margin-top: 24px;
  margin-bottom: 16px;


  button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;

    span {
      color: ${({ theme }) => theme.colors.primary.main};
      font-size: 16px;
      font-weight: 600;
      margin-right: 8px;
    }

    img {
      transition: 0.3s ease-in-out;
      transform: ${({ orderBy }) => (orderBy === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)')};
    }
  }
`;

export const Card = styled.div`
  background: #FFF;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;

  & + & {
    margin-top: 16px;
  }

  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  .info {
    .contact-name {
      display: flex;
      align-items: center;

      small {
        background: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: 600;
        text-transform: uppercase;
        padding: 4px;
        border-radius: 4px;
        margin-left: 8px;
      }
    }

    span {
      margin: 5px 0;
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray.lighter}
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      background: transparent;
      border: none;
      margin-left: 8px;
    }
  }
`;

export const ErrorContainer = styled.div`
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

export const EmptyListContainer = styled.div`
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

export const NoContactFoundContainer = styled.div`
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
