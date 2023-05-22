import { room } from '../../User/api/client';
import HeaderForm from '../components/HeadersForm';

const headers = HeaderForm();

//정보 불러오기
export const takeAllInfo = () =>
  room.get('http://3.35.38.254:8000/rooms', 1, { headers });
export const addInfo = (formdata) =>
  room.post('http://3.35.38.254:8000/rooms', formdata, { headers });
export const removeInfo = (id) =>
  room.delete(`http://3.35.38.254:8000/rooms/${id}`, id, { headers });
export const changeInfo = ({ id, formdata }) =>
  room.patch(`http://3.35.38.254:8000/rooms/${id}`, formdata, { headers });
