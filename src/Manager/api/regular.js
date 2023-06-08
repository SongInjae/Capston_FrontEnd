import { regular } from '../../User/api/client';
import cookie from 'react-cookies';

//회원정보 불러오기
export const takeAllInfo = () =>
  regular.get('rooms/my-reservations', {
    params: { is_scheduled: true },
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });

export const removeInfo = (id) =>
  regular.delete(`rooms/my-reservations/${id}`, {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
