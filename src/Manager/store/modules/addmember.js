import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const CHANGE_FIELD = 'addmembers/CHANGE_FIELD';

const INSERT = 'addmembers/INSERT';
const CHANGE = 'addmembers/CHANGE';
const REMOVE = 'addmembers/REMOVE';

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key, //id, designation, name, number, email
  value, //실제 바꾸려는 값
}));

let id = 4;
export const insert = createAction(
  INSERT,
  ({ designation, name, number, email, pwd }) => ({
    id: id++,
    designation,
    name,
    number,
    email,
    pwd,
  }),
);
export const change = createAction(CHANGE, (id) => id);
export const remove = createAction(REMOVE, (id) => id);

const initialState = {
  info: [
    {
      id: 1,
      designation: '교수',
      name: '한동일',
      number: '12345678',
      email: 'dsjl@sejong.ac.kr',
      pwd: 1234,
    },
    {
      id: 2,
      designation: '조교',
      name: '멍멍이',
      number: '41345678',
      email: 'dsjl@naver.com',
      pwd: 1234,
    },
    {
      id: 3,
      designation: '학생',
      name: '송인재',
      number: '12562678',
      email: 'jgh@naver.com',
      pwd: 1234,
    },
  ],
};

const addmembers = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft[key] = value;
      }),
    [INSERT]: (state, { payload: info }) =>
      produce(state, (draft) => {
        draft.info.push(info);
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.info.findIndex((info) => info.id === id);
        draft.info.splice(index, 1);
      }),
  },
  initialState,
);

export default addmembers;
