import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const REMOVE = 'reserve/REMOVE';

export const remove = createAction(REMOVE, (id) => id);

const initialState = {
  infos: [
    {
      id: 1,
      date: '4월 16일',
      name: '한동일',
      designation: '교수',
      time: '09:00 - 12:00',
      email: 'sfjl@naver.com',
    },
    {
      id: 2,
      date: '4월 19일',
      name: '멍멍이',
      designation: '조교',
      time: '18:00 - 20:00',
      email: 'sdflj@jdsfl.com',
    },
    {
      id: 3,
      date: '5월 11일',
      name: '송인재',
      designation: '학생',
      time: '15:00 - 16:00',
      email: 'dfsjal@sejong.ac.kr',
    },
  ],
};

const reserve = handleActions(
  {
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.infos.findIndex((info) => info.id === id);
        draft.infos.splice(index, 1);
      }),
  },
  initialState,
);

export default reserve;
