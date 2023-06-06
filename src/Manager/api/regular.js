import { regular } from '../../User/api/client';
import cookie from 'react-cookies';

const token = cookie.load('token');

//회원정보 불러오기
export const takeAllInfo = () =>
  regular.get('http://localhost/api/rooms/my-reservations', {
    params: { is_scheduled: true },
    headers: { Authorization: `Token ${token}` },
  });

export const removeInfo = (id) =>
  regular.delete(`http://localhost/api/rooms/my-reservations/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });
