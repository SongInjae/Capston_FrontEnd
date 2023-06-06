import { room } from '../../User/api/client';
import cookie from 'react-cookies';

const token = cookie.load('token');

export const takeAllInfo = () =>
  room.get('rooms', {
    headers: { Authorization: `Token ${token}` },
  });
export const addInfo = (formdata) =>
  room.post('rooms', formdata, {
    headers: { Authorization: `Token ${token}` },
  });
export const removeInfo = (id) =>
  room.delete(`rooms/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });
export const changeInfo = ({ id, formData }) =>
  room.put(`rooms/${id}`, formData, {
    headers: { Authorization: `Token ${token}` },
  });
