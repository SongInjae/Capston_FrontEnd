import client from './client';
import cookie from 'react-cookies';

const token = cookie.load('token');

export const getRoomsInfo = () =>
  client.get('rooms', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });

export const getRoomInfo = (id) =>
  client.get('rooms' + id, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
