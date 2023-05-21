import { manager } from '../../User/api/client';
import header from '../components/Headers';

const headers = header();

//정보 불러오기
export const takeAllInfo = () => manager.get('users', 1);
export const addInfo = ({ user_type, name, user_no, email, password }) =>
  manager.post(
    'users',
    { user_type, name, user_no, email, password },
    { headers },
  );
export const removeInfo = (id) =>
  manager.delete(`users/${id}`, id, { headers });
export const changeInfo = ({ id, user_type, name, user_no, email }) =>
  manager.patch(
    `users/${id}`,
    { user_type, name, user_no, email },
    { headers },
  );
/*
//로그인
export const login = ({ username, password }) =>
  client.post('http://3.35.38.254:8000/users/login', { username, password });
//로그아웃
export const logout = () => client.post('http://3.35.38.254:8000/users/logout');

*/
