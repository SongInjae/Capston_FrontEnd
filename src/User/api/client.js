import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const client = axios.create();
export const manager = axios.create();
export const room = axios.create();

export default client;
