import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const client = axios.create({
  baseURL: '/api', // 프록시 서버 주소 설정
  timeout: 5000, // 요청 시간 초과 시간 설정 (옵션)
});

export const board = axios.create({
  baseURL: '/api', // 프록시 서버 주소 설정
  timeout: 5000, // 요청 시간 초과 시간 설정 (옵션)
});

export const manager = axios.create({
  baseURL: '/api', // 프록시 서버 주소 설정
  timeout: 5000, // 요청 시간 초과 시간 설정 (옵션)
});
export const room = axios.create({
  baseURL: '/api', // 프록시 서버 주소 설정
  timeout: 5000, // 요청 시간 초과 시간 설정 (옵션)
});
export const notify = axios.create({
  baseURL: '/api', // 프록시 서버 주소 설정
  timeout: 5000, // 요청 시간 초과 시간 설정 (옵션)
});
export const reserve = axios.create({
  baseURL: '/api', // 프록시 서버 주소 설정
  timeout: 5000, // 요청 시간 초과 시간 설정 (옵션)
});
export const regular = axios.create({
  baseURL: '/api', // 프록시 서버 주소 설정
  timeout: 5000, // 요청 시간 초과 시간 설정 (옵션)
});
export const noshow = axios.create({
  baseURL: '/api', // 프록시 서버 주소 설정
  timeout: 5000, // 요청 시간 초과 시간 설정 (옵션)
});

export default client;
