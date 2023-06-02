import client from "./client";
import cookie from 'react-cookies';

const token = cookie.load('token');

export const getReport = () => client.get('http://3.35.38.254:8000/utils/report', {
    headers: {
        Authorization: 'Token ' + token
    }
});

export const postReport = (body) => client.get('http://3.35.38.254:8000/utils/report', body, {
    headers: {
        Authorization: 'Token ' + token
    }
});

export const deleteReport = (id) => client.get('http://3.35.38.254:8000/utils/report' + id, {
    headers: {
        Authorization: 'Token ' + token
    }
});

