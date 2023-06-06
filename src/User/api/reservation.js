import client from './client';
import cookie from 'react-cookies';

const token = cookie.load('token');
export const getMyReservation = (id) =>
  client.get('http://localhost/api/rooms/my-reservations?booker=' + id, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });

export const makeReservation = (body) =>
  client.post('http://localhost/api/rooms/reservations', body, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });

export const deleteMyReservation = (id) =>
  client.delete('http://localhost/api/rooms/my-reservations/' + id, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });

export const getRoomReservation = (id) =>
  client.get('http://localhost/api/rooms/reservations?room=' + id, {
    headers: {
      Authorization: 'Token ' + token,
    },
  });

export const getRoomReserveByDate = (id, date) =>
  client.get(
    `http://localhost/api/rooms/reservations?date=${date}&room=${id}`,
    {
      headers: {
        Authorization: 'Token ' + token,
      },
    },
  );

export const authLocate = (id, lat, log) =>
  client.post(
    `http://localhost/api/rooms/reservations/${id}/location?latitude=${lat}&logtitude=${log}`,
    {
      headers: {
        Authorization: 'Token ' + token,
      },
      withCredentials: true,
    },
  );
