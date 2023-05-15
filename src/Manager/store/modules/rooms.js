import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const CHANGE_FIELD = 'rooms/CHANGE_FIELD';

const INSERT = 'rooms/INSERT';
const CHANGE = 'rooms/CHANGE';
const REMOVE = 'rooms/REMOVE';

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
let id = 3;
export const insert = createAction(INSERT, ({ room_name, facility, text }) => ({
  id: id++,
  room_name,
  facility,
  text,
}));
export const change = createAction(
  CHANGE,
  ({ idx, id, room_name, facility, text }) => ({
    idx,
    id,
    room_name,
    facility,
    text,
  }),
);
export const remove = createAction(REMOVE, (id) => id);

const initialState = {
  rooms: [
    {
      id: 1,
      room_name: '대양AI센터 835호',
      facility: '빔프로젝트, 컴퓨터 2대',
      text: '뒷정리 잘하고 갈 것',
    },
    {
      id: 2,
      room_name: '대양AI센터 836호',
      facility: '빔프로젝트, 컴퓨터 1대',
      text: '뒷정리 잘하고 갈 것',
    },
  ],
};

const rooms = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft[key] = value;
      }),
    [INSERT]: (state, { payload: room }) =>
      produce(state, (draft) => {
        draft.rooms.push(room);
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.rooms.findIndex((room) => room.id === id);
        draft.rooms.splice(index, 1);
      }),
    [CHANGE]: (state, { payload: { idx, id, room_name, facility, text } }) =>
      produce(state, (draft) => {
        for (let i = 0; i < draft.rooms.length; i++) {
          if (draft.rooms[i].id === idx) {
            draft.rooms[i] = { id, room_name, facility, text };
          }
        }
      }),
  },
  initialState,
);

export default rooms;
