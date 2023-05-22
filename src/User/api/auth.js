import client from './client';

//로그인
export const login = ({ username, password }) =>
  client.post(
    'http://3.35.38.254:8000/users/login',
    { username, password },
    { withCredentials: true },
  );
//로그아웃
export const logout = () => client.post('http://3.35.38.254:8000/users/logout');

//export const check = () => client.get('api/auth/check');
//회원가입
/*
export const register = ({ username, password }) =>
  client.post('http://3.35.38.254:8000/users', { username, password });
  */
