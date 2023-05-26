import client from './client';
import { token } from '../saga/createRequestSaga';



export const getMyInformation = () => client.get('http://3.35.38.254:8000/users/mine', {
    headers: {
        Authorization: 'Token ' + token,
    }
});
export const changeUserInfo = (id, data) => client.patch('http://3.35.38.254:8000/users/' + id, data, {
    headers: {
        Authorization: 'Token ' + token,
    }
});
export const changePassword = (changedInfo) => {

    client.patch('http://3.35.38.254:8000/users/password', changedInfo, {
        headers: {
            Authorization: 'Token ' + token,
        },
    });
}

export const connectGoogle = () => {

    client.post('/users/google-login', {},
        {
            headers: {
                Authorization: `Token ${token}`,
                withCredentials: true,
            },
        });
}

export const revokeGoogle = () => {
    client.post('http://3.35.38.254:8000/users/google-revoke', {
        headers: {
            Authorization: 'Token ' + token
        }
    });
}

export const existUserNo = (userNumber) => {
    client.get('http://3.35.38.254:8000/users?user_no=' + userNumber,
        {
            headers: {
                Authorization: 'Token ' + token
            }
        }
    );
}