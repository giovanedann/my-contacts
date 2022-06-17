import styled from 'styled-components';

export default styled.select`
  width: 100%;
  height: 52px;
  border-radius: 4px;
  border: none;
  background: #FFF;
  border: 2px solid #FFF;
  outline: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease-in;
  padding: 0 16px;
  font-size: 16px;
  appearance: none;

  &:focus {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray.veryLight};
    border-color: transparent;
  }
`;
