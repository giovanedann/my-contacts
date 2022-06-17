import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin-top: 16px;
  }

  button {
    margin-top: 16px;
  }

  small {
    color: ${({ theme }) => theme.colors.danger.main};
    font-size: 12px;
    display: block;
    margin-top: 8px;
  }

  .form-field {
    position: relative;

    .spinner-container {
      position: absolute;
      right: 16px;
      top: 17.5px;
    }
  }
`;
