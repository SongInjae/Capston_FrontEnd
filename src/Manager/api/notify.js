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
export const addInfo = (formData) =>
  notify.post('http://3.35.38.254:8000/utils/notice', formData, {
    headers: { Authorization: `Token ${token}` },
  });
export const removeInfo = (id) =>
  notify.delete(`http://3.35.38.254:8000/utils/notice/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });
export const changeInfo = ({ id, formData }) =>
  notify.put(`http://3.35.38.254:8000/utils/notice/${id}`, formData, {
    headers: { Authorization: `Token ${token}` },
  });
