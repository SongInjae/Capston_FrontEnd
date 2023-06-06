import { notify } from '../../User/api/client';
import cookie from 'react-cookies';

const token = cookie.load('token');

export const takeAllInfo = () =>
  notify.get('http://localhost/api/utils/notice', {
    headers: { Authorization: `Token ${token}` },
  });
export const addInfo = (formData) =>
  notify.post('http://localhost/api/utils/notice', formData, {
    headers: { Authorization: `Token ${token}` },
  });
export const removeInfo = (id) =>
  notify.delete(`http://localhost/api/utils/notice/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });
export const changeInfo = ({ id, formData }) =>
  notify.put(`http://localhost/api/utils/notice/${id}`, formData, {
    headers: { Authorization: `Token ${token}` },
  });
