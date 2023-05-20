import client from './client';

export const getRoomsInfo = ()=>client.get('http://3.35.38.254:8000/rooms');

export const getRoomInfo = (id)=>client.get('http://3.35.38.254:8000/rooms/'+id)