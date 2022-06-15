import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  position: relative;
`;

export const SearchInputContainer = styled.div`
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

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;

  strong {
    font-size: 24px;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: 600;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 4px;
    padding: 8px 16px;
    transition: all 0.2s ease-in;

    &:hover {
      color: #FFF;
      background: ${({ theme }) => theme.colors.primary.main};
      transform: scale(1.05);
    }
  }
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
