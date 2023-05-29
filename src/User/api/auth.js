import client from './client';
import cookie from 'react-cookies';

//로그인
export const login = ({ username, password }) =>
  client.post(
    'http://3.35.38.254:8000/users/login',
    { username, password },
    { withCredentials: true },
  );
//로그아웃
export const mine = () =>
  client.get('http://3.35.38.254:8000/users/mine', {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });

//export const check = () => client.get('api/auth/check');
//회원가입
/*
export const register = ({ username, password }) =>
  client.post('http://3.35.38.254:8000/users', { username, password });
  */
