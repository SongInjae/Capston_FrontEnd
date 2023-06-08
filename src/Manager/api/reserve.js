import { reserve } from '../../User/api/client';
import cookie from 'react-cookies';

//회원정보 불러오기
export const takeAllInfo = () =>
  reserve.get('rooms/my-reservations', {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });

export const removeInfo = (id) =>
  reserve.delete(`rooms/my-reservations/${id}`, {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
