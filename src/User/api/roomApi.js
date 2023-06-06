import client from './client';
import cookie from 'react-cookies';

const token = cookie.load('token');

export const getRoomsInfo = () =>
  client.get('http://localhost/api/rooms', {
    headers: {
      Authorization: 'Token ' + token,
    },
  });

export const getRoomInfo = (id) =>
  client.get('http://localhost/api/rooms' + id, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });
