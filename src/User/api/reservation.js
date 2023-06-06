import client from './client';
import cookie from 'react-cookies';

const token = cookie.load('token');
export const getMyReservation = (id) =>
  client.get('rooms/my-reservations?booker=' + id, {
    headers: {
      Authorization: `Token ${cookie.load('token')}`,
    },
  });

export const makeReservation = (body) =>
  client.post('rooms/reservations', body, {
    headers: {
      Authorization: `Token ${cookie.load('token')}`,
    },
  });

export const deleteMyReservation = (id) =>
  client.delete('rooms/my-reservations/' + id, {
    headers: {
      Authorization: `Token ${cookie.load('token')}`,
    },
  });

export const getRoomReservation = (id) =>
  client.get('rooms/reservations?room=' + id, {
    headers: {
      Authorization: `Token ${cookie.load('token')}`,
    },
  });

export const getRoomReserveByDate = (id, date) =>
  client.get(`rooms/reservations?date=${date}&room=${id}`, {
    headers: {
      Authorization: `Token ${cookie.load('token')}`,
    },
  });

export const authLocate = (id, lat, log) =>
  client.post(
    `rooms/reservations/${id}/location?latitude=${lat}&logtitude=${log}`,
    {
      headers: {
        Authorization: `Token ${cookie.load('token')}`,
      },
      withCredentials: true,
    },
  );
