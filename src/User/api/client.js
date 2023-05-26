import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const client = axios.create();
export const manager = axios.create();
export const room = axios.create();
export const notify = axios.create();
export const reserve = axios.create();
export const regular = axios.create();
export const noshow = axios.create();

export default client;
