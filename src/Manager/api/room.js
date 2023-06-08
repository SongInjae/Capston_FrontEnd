import { room } from '../../User/api/client';
import cookie from 'react-cookies';

export const takeAllInfo = () =>
  room.get('rooms', {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
export const addInfo = (formdata) =>
  room.post('rooms', formdata, {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
export const removeInfo = (id) =>
  room.delete(`rooms/${id}`, {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
export const changeInfo = ({ id, formData }) =>
  room.put(`rooms/${id}`, formData, {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
