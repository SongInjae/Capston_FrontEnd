import client from './client';

//로그인
export const login = ({ user_no, password }) =>
  client.post(
    'http://3.35.38.254:8000/users/login',
    { user_no, password },
    { withCredentials: true },
  );
//로그아웃
export const logout = () => client.post('users/logout');

//export const check = () => client.get('api/auth/check');
//회원가입
/*
export const register = ({ username, password }) =>
  client.post('http://3.35.38.254:8000/users', { username, password });
  */
