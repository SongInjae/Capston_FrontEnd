import { room } from '../../User/api/client';
import cookie from 'react-cookies';

const token = cookie.load('token');

export const takeAllInfo = () =>
  room.get('http://localhost/api/rooms', {
    headers: { Authorization: `Token ${token}` },
  });
export const addInfo = (formdata) =>
  room.post('http://localhost/api/rooms', formdata, {
    headers: { Authorization: `Token ${token}` },
  });
export const removeInfo = (id) =>
  room.delete(`http://localhost/api/rooms/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });
export const changeInfo = ({ id, formData }) =>
  room.put(`http://localhost/api/rooms/${id}`, formData, {
    headers: { Authorization: `Token ${token}` },
  });
