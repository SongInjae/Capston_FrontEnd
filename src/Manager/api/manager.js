import { manager } from '../../User/api/client';
import cookie from 'react-cookies';

//엑셀 회원 불러오기
export const excelInfo = (formData) =>
  manager.post('users/bulk', formData, {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
//회원 bulk 삭제하기
export const bulkDelete = (data) =>
  manager.delete(
    'users/bulk',
    { data },
    {
      headers: {
        Authorization: `Token ${cookie.load('token')}`,
        'Content-Type': `text/plain`,
      },
    },
  );
//회원정보 불러오기
export const takeAllInfo = () =>
  manager.get('users', {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
//회원 추가하기
export const addInfo = ({ user_type, name, user_no, email, department }) =>
  manager.post(
    'users',
    { user_type, name, user_no, email, password: 12345678, department },
    { headers: { Authorization: `Token ${cookie.load('token')}` } },
  );
//회원 삭제하기
export const removeInfo = (id) =>
  manager.delete(`users/${id}`, {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
//회원 변경하기
export const changeInfo = ({
  id,
  user_type,
  user_no,
  email,
  name,
  department,
}) =>
  manager.patch(
    `users/${id}`,
    { user_type, user_no, email, name, department },
    {
      headers: { Authorization: `Token ${cookie.load('token')}` },
    },
  );
