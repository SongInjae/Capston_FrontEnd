import { manager } from '../../User/api/client';
import cookie from 'react-cookies';

const token = cookie.load('token');

//엑셀 회원 불러오기
export const excelInfo = (formData) =>
  manager.post('http://3.35.38.254:8000/users/bulk', formData, {
    headers: { Authorization: `Token ${token}` },
  });
//회원 bulk 삭제하기
export const bulkDelete = (data) =>
  manager.delete(
    'http://3.35.38.254:8000/users/bulk',
    { data },
    {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': `text/plain`,
      },
    },
  );
//회원정보 불러오기
export const takeAllInfo = () =>
  manager.get('http://3.35.38.254:8000/users', {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
//회원 추가하기
export const addInfo = ({
  user_type,
  name,
  user_no,
  email,
  password,
  department,
}) =>
  manager.post(
    'http://3.35.38.254:8000/users',
    { user_type, name, user_no, email, password, department },
    { headers: { Authorization: `Token ${token}` } },
  );
//회원 삭제하기
export const removeInfo = (id) =>
  manager.delete(`http://3.35.38.254:8000/users/${id}`, {
    headers: { Authorization: `Token ${token}` },
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
    `http://3.35.38.254:8000/users/${id}`,
    { user_type, user_no, email, name, department },
    {
      headers: { Authorization: `Token ${token}` },
    },
  );
