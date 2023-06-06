import client from './client';
import cookie from 'react-cookies';

const token = cookie.load('token');

export const getMyInformation = () =>
  client.get('users/mine', {
    headers: {
      Authorization: `Token ${cookie.load('token')}`,
    },
  });
export const changeUserInfo = (id, data) =>
  client.patch('users/' + id, data, {
    headers: {
      Authorization: `Token ${cookie.load('token')}`,
    },
  });
export const changePassword = (changedInfo) =>
  client.patch('users/password', changedInfo, {
    headers: {
      Authorization: `Token ${cookie.load('token')}`,
    },
  });

export const connectGoogle = (user_no) =>
  client.get(
    'users/google-login?user_no=' + user_no,

    {
      headers: {
        Authorization: `Token ${cookie.load('token')}`,
      },

      withCredentials: true,
    },
    { withCredentials: true },
  );

export const revokeGoogle = () => {
  client.post('users/google-revoke', {
    headers: {
      Authorization: `Token ${cookie.load('token')}`,
    },
  });
};

export const existUserNo = (userNumber) =>
  client.get('users?user_no=' + userNumber, {
    headers: {
      Authorization: `Token ${cookie.load('token')}`,
    },
  });
