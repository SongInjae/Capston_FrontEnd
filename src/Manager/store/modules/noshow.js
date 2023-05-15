import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const REMOVE = 'noshow/REMOVE';

export const remove = createAction(REMOVE, (id) => id);

const initialState = {
  infos: [
    {
      id: 1,
      designation: '교수',
      name: '한동일',
      number: '18011382',
      count: 1,
      email: 'dsjlf@gamil.com',
    },
    {
      id: 2,
      designation: '대학원생',
      name: '멍멍이',
      number: '12345672',
      count: 1,
      email: '2dls03@sejong.ac.kr',
    },
    {
      id: 3,
      designation: '학생',
      name: '송인재',
      number: '18011857',
      count: 1,
      email: 'sjl@naver.com',
    },
  ],
};

const noshow = handleActions(
  {
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.infos.findIndex((info) => info.id === id);
        draft.infos.splice(index, 1);
      }),
  },
  initialState,
);

export default noshow;
