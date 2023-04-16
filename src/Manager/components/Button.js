import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  outline: none;
  cursor: pointer;
  background-color: rgb(195, 0, 47);
  &:hover {
    background: rgba(105, 0, 47, 0.1);
  }
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
