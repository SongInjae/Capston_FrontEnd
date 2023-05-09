import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const REMOVE = 'reserve/REMOVE';

export const remove = createAction(REMOVE, (id) => id);

const initialState = {
  infos: [
    {
      id: 1,
      date_year: 2023,
      date_month: 4,
      date_day: 16,
      name: '한동일',
      designation: '교수',
      time: '09:00 - 12:00',
      email: 'sfjl@naver.com',
    },
    {
      id: 2,
      date_year: 2023,
      date_month: 4,
      date_day: 10,
      name: '멍멍이',
      designation: '조교',
      time: '18:00 - 20:00',
      email: 'sdflj@jdsfl.com',
    },
    {
      id: 3,
      date_year: 2023,
      date_month: 5,
      date_day: 11,
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
