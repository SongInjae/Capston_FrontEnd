import client from './client';
import { token } from '../saga/createRequestSaga';

export const changeUserInfo = (id, changedInfo) => client.patch('http://3.35.38.254:8000/users/' + id, changedInfo);
export const changePassword = (changedInfo) => {
    console.log(token)
    client.patch('http://3.35.38.254:8000/users/password', changedInfo, {
        headers: {
            Authorization: 'Token ' + token
        }
    });
}

export const existUserNo = (userNumber) => {
    console.log(token)
    client.patch('http://3.35.38.254:8000/users/password?user_no=' + userNumber, {
        headers: {
            Authorization: 'Token ' + token
        }
    });
}