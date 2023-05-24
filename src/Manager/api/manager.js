import { manager } from '../../User/api/client';
import cookie from 'react-cookies';

const token = cookie.load('token');

//회원정보 불러오기
export const takeAllInfo = () =>
  manager.get('http://3.35.38.254:8000/users', {
    headers: { Authorization: `Token ${token}` },
  });
//회원 추가하기
export const addInfo = ({ user_type, name, user_no, email, password }) =>
  manager.post(
    'http://3.35.38.254:8000/users',
    { user_type, name, user_no, email, password, department: 1 },
    { headers: { Authorization: `Token ${token}` } },
  );
//회원 삭제하기
export const removeInfo = (id) =>
  manager.delete(`users/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });
//회원 변경하기
export const changeInfo = ({ id, user_type, user_no, email, name }) =>
  manager.patch(
    `http://3.35.38.254:8000/users/${id}`,
    { user_type, user_no, email, name },
    {
      headers: { Authorization: `Token ${token}` },
    },
  );
