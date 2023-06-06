import client from './client';
import cookie from 'react-cookies';

const token = cookie.load('token');

export const getReport = () =>
  client.get('http://localhost/api/utils/report', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });

export const postReport = (body) =>
  client.get('http://localhost/api/utils/report', body, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });

export const deleteReport = (id) =>
  client.get('http://localhost/api/utils/report' + id, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
