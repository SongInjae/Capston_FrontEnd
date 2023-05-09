import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const REMOVE = 'regular/REMOVE';

export const remove = createAction(REMOVE, (id) => id);

const initialState = {
  regularInfo: [
    {
      id: 1,
      designation: '교수',
      name: '한동일',
      day: '월, 화, 수, 목, 금, 토, 일',
      time: '09:00 - 12:00',
      email: 'dfsjakl@naver.com',
    },
    {
      id: 2,
      designation: '조교',
      name: '멍멍이',
      day: '월, 화, 수, 목, 금',
      time: '09:00 - 12:00',
      email: 'dfsjakl@sejong.ac.kr',
    },
    {
      id: 3,
      designation: '교수',
      name: '송인재',
      day: '월, 화, 수, 목, 금, 토, 일',
      time: '15:00 - 16:00',
      email: 'dfsjakl@daum.net',
    },
  ],
};

const regular = handleActions(
  {
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.regularInfo.findIndex((info) => info.id === id);
        draft.regularInfo.splice(index, 1);
      }),
  },
  initialState,
);

export default regular;
