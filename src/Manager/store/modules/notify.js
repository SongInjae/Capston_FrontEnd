import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../saga/createRequestSaga';
import * as notifyAPI from '../../api/notify';

const CHANGE_FIELD = 'discomfort/CHANGE_FIELD';

const [TAKE, TAKE_SUCCESS, TAKE_FAILURE] =
  createRequestActionTypes('notify/Take');
const INSERT = 'discomfort/INSERT';
const CHANGE = 'discomfort/CHANGE';
const REMOVE = 'discomfort/REMOVE';

let id = 4;

export const take = createAction(TAKE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const insert = createAction(INSERT, ({ title, text, date }) => ({
  id: id++,
  title,
  text,
  date,
}));
export const change = createAction(
  CHANGE,
  ({ idx, id, title, text, date }) => ({
    idx,
    id,
    title,
    text,
    date,
  }),
);
export const remove = createAction(REMOVE, (id) => id);

const takeSaga = createRequestSaga(TAKE, notifyAPI.takeAllInfo);

export function* notifySaga() {
  yield takeLatest(TAKE, takeSaga);
}

const initialState = {
  infos: [
    {
      id: 1,
      title: '이것은 첫번째 공지사항입니다.',
      text: '<p>1번째 공지사항</p>',
      date: '2022.03.14',
    },
    {
      id: 2,
      title: '이것은 두번째 공지사항입니다.',
      text: '<p>2번째 공지사항</p>',
      date: '2022.05.16',
    },
    {
      id: 3,
      title: '이것은 세번째 공지사항입니다.',
      text: '<p>3번째 공지사항</p>',
      date: '2022.08.14',
    },
  ],
  takeError: null,
};

const notify = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft[key] = value;
      }),
    [TAKE_SUCCESS]: (state, { payload: infos }) => ({
      ...state,
      takeError: null,
      infos,
    }),
    [TAKE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      takeError: error,
    }),
    [INSERT]: (state, { payload: info }) =>
      produce(state, (draft) => {
        draft.infos.push(info);
      }),
    [CHANGE]: (state, { payload: { idx, id, title, text, date } }) =>
      produce(state, (draft) => {
        for (let i = 0; i < draft.infos.length; i++) {
          if (draft.infos[i].id === idx) {
            draft.infos[i] = { id, title, text, date };
          }
        }
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.infos.findIndex((info) => info.id === id);
        draft.infos.splice(index, 1);
      }),
  },
  initialState,
);

export default notify;
