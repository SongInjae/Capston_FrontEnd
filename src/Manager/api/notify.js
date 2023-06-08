import { notify } from '../../User/api/client';
import cookie from 'react-cookies';

export const takeAllInfo = () =>
  notify.get('utils/notice', {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
export const addInfo = (formData) =>
  notify.post('utils/notice', formData, {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
export const removeInfo = (id) =>
  notify.delete(`utils/notice/${id}`, {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
export const changeInfo = ({ id, formData }) =>
  notify.put(`utils/notice/${id}`, formData, {
    headers: { Authorization: `Token ${cookie.load('token')}` },
  });
