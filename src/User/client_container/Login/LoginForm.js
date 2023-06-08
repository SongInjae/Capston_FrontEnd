import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, login } from '../../store/modules/auth';
import { useNavigate } from 'react-router-dom';
//import { useCookies } from 'react-cookie';
import cookie from 'react-cookies';

const LoginFormBlock = styled.div`
  @media screen and (max-width: 480px) {
    width: 80%;
  }
`;

const FormBlock = styled.form`
  @media screen and (max-width: 480px) {
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid lightgray;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: lightgray;
  }
  & + & {
    margin-top: 1rem;
  }
  @media screen and (max-width: 480px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;
const StyledButton = styled.button`
  background-color: #c3002f;
  width: 16rem;
  height: 3rem;
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  border-radius: 8px;
  border: none;
  outline: none;
  margin-top: 1rem;

  cursor: pointer;
  :hover {
    background-color: black;
  }
  @media screen and (max-width: 500px) {
    margin-top: 15px;
    width: 60%;
    height: 20px;
    text-align: center;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.7rem;
  margin-top: 1rem;
  @media screen and (max-width: 500px) {
    font-size: 0.5rem;
  }
`;

const LoginForm = () => {
  const [error, setError] = useState(null);
  //const [cookies, setCookie] = useCookies(['id']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('아이디와 패스워드를 다시 한 번 확인해주세요.');
      return;
    }
    if (auth) {
      if (auth.user_type.id === 1) {
        navigate('admin');
      } else {
        navigate('main');
      }
      dispatch(changeField({ key: 'username', value: '' }));
      dispatch(changeField({ key: 'password', value: '' }));
    }
  }, [auth, authError, dispatch, form.username, navigate]);
  return (
    <>
      <LoginFormBlock>
        <FormBlock onSubmit={onSubmit}>
          <StyledInput
            autoComplete="username"
            name="username"
            placeholder="아이디"
            onChange={onChange}
            value={form.username}
          />
          <StyledInput
            autoComplete="password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={onChange}
            value={form.password}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <StyledButton>로그인</StyledButton>
        </FormBlock>
      </LoginFormBlock>
    </>
  );
};

export default LoginForm;
