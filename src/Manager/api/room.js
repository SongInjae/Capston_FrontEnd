import { room } from '../../User/api/client';
import cookie from 'react-cookies';

const token = cookie.load('token');

//정보 불러오기
export const takeAllInfo = () =>
  room.get('http://3.35.38.254:8000/rooms', 1, {
    headers: { Authorization: `Token ${token}` },
  });
export const addInfo = (formdata) =>
  room.post('http://3.35.38.254:8000/rooms', formdata, {
    headers: { Authorization: `Token ${token}` },
  });
export const removeInfo = (id) =>
  room.delete(`http://3.35.38.254:8000/rooms/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });
export const changeInfo = ({ id, formData }) =>
  room.put(`http://3.35.38.254:8000/rooms/${id}`, formData, {
    headers: { Authorization: `Token ${token}` },
  });
