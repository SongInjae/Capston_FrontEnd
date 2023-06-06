import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const client = axios.create({
  baseURL: '/api', // 프록시 서버 주소 설정
  timeout: 5000, // 요청 시간 초과 시간 설정 (옵션)
});

export const board = axios.create();

export const manager = axios.create();
export const room = axios.create();
export const notify = axios.create();
export const reserve = axios.create();
export const regular = axios.create();
export const noshow = axios.create();

export default client;
