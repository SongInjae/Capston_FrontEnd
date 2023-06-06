import client from './client';
import cookie from 'react-cookies';


export const getRoomsInfo = () =>
  client.get('rooms', {
    headers: {
      Authorization: `Token ${cookie.load('token')}`,
    },
  });

export const getRoomInfo = (id) =>
  client.get('rooms/' + id, {
    headers: {
      Authorization: `Token ${cookie.load('token')}`,
    },
  });
