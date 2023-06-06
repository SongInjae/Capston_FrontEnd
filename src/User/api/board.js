import { board } from './client';
import cookie from 'react-cookies';

const token = cookie.load('token');

export const takeAllInfo = () =>
  board.get('http://localhost/api/utils/notice', {
    headers: { Authorization: `Token ${token}` },
  });
