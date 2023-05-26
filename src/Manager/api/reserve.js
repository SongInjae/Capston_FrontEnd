import { reserve } from '../../User/api/client';
import cookie from 'react-cookies';

const token = cookie.load('token');

//회원정보 불러오기
export const takeAllInfo = () =>
  reserve.get('http://3.35.38.254:8000/rooms/my-reservations', {
    headers: { Authorization: `Token ${token}` },
  });

export const removeInfo = (id) =>
  reserve.delete(`http://3.35.38.254:8000/rooms/my-reservations/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });
