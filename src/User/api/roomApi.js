import client from './client';
import cookie from 'react-cookies';

const token = cookie.load('token');


export const getRoomsInfo = () => client.get('http://3.35.38.254:8000/rooms', {
    headers: {
        Authorization: 'Token ' + token
    }
});

export const getRoomInfo = (id) => client.get('http://3.35.38.254:8000/rooms' + id, {
    headers: {
        Authorization: 'Token ' + token
    }
});