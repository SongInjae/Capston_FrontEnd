import client from './client';
import cookie from 'react-cookies';

const token = cookie.load('token');

export const getMyInformation = () =>
  client.get('http://localhost/api/users/mine', {
    headers: {
      Authorization: `Token ${cookie.load('token')}`,
    },
  });
export const changeUserInfo = (id, data) =>
  client.patch('http://localhost/api/users/' + id, data, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
export const changePassword = (changedInfo) =>
  client.patch('http://localhost/api/users/password', changedInfo, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });

export const connectGoogle = (user_no) =>
  client.get(
    'http://localhost/api/users/google-login?user_no=' + user_no,

    {
      headers: {
        Authorization: `Token ${token}`,
      },

      withCredentials: true,
    },
    { withCredentials: true },
  );

export const revokeGoogle = () => {
  client.post('http://localhost/api/users/google-revoke', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
};

export const existUserNo = (userNumber) =>
  client.get('http://localhost/api/users?user_no=' + userNumber, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
