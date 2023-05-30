import { board } from './client';
import cookie from 'react-cookies';

const token = cookie.load('token');

export const takeAllInfo = () =>
  board.get('http://3.35.38.254:8000/utils/notice', {
    headers: { Authorization: `Token ${token}` },
  });
