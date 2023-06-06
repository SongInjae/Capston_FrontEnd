import { noshow } from '../../User/api/client';
import cookie from 'react-cookies';

//회원정보 불러오기
export const takeInfo = () =>
  noshow.get('users/noshow', {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });

export const takeType = () =>
  noshow.get('users/types/noshow', {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
