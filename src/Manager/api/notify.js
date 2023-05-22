import { notify } from '../../User/api/client';
import cookie from 'react-cookies';

const token = cookie.load('token');

export const takeAllInfo = () =>
  notify.get(
    'http://3.35.38.254:8000/utils/notice',
    { page: 1 },
    {
      headers: { Authorization: `Token ${token}` },
    },
  );
