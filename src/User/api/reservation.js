import client from './client';
import { token } from '../saga/createRequestSaga';
export const getMyReservation = () => client.get('http://3.35.38.254:8000/rooms/reservations');

export const deleteMyReservation = (id) => {
    console.log(id);
    client.delete('http://3.35.38.254:8000/rooms/reservations/' + id, {
        headers: {
            Authorization: 'Token ' + { token }
        }
    });
}
