import client from './client';
import cookie from 'react-cookies';

const token = cookie.load('token');

export const getReport = () =>
  client.get('utils/report', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });

export const postReport = (body) =>
  client.get('utils/report', body, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });

export const deleteReport = (id) =>
  client.get('utils/report' + id, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
