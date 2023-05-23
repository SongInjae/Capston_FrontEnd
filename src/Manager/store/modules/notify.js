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
const [INSERT, INSERT_SUCCESS, INSERT_FAILURE] =
  createRequestActionTypes('notify/INSERT');
const [REMOVE, REMOVE_SUCCESS, REMOVE_FAILURE] =
  createRequestActionTypes('notify/REMOVE');
const [CHANGE, CHANGE_SUCCESS, CHANGE_FAILURE] =
  createRequestActionTypes('notify/CHANGE');

let id = 4;

export const take = createAction(TAKE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const insert = createAction(INSERT, (formData) => formData);
export const remove = createAction(REMOVE, (id) => id);
export const change = createAction(CHANGE, ({ id, formData }) => ({
  id,
  formData,
}));

const takeSaga = createRequestSaga(TAKE, notifyAPI.takeAllInfo);
const addSaga = createRequestSaga(INSERT, notifyAPI.addInfo);
const removeSaga = createRequestSaga(REMOVE, notifyAPI.removeInfo);
const changeSaga = createRequestSaga(CHANGE, notifyAPI.changeInfo);

export function* notifySaga() {
  yield takeLatest(TAKE, takeSaga);
  yield takeLatest(INSERT, addSaga);
  yield takeLatest(REMOVE, removeSaga);
  yield takeLatest(CHANGE, changeSaga);
}

const initialState = {
  infos: [
    {
      id: 1,
      title: '이것은 첫번째 공지사항입니다.',
      content: '<p>1번째 공지사항</p>',
      date: '2022.03.14',
    },
    {
      id: 2,
      title: '이것은 두번째 공지사항입니다.',
      content: '<p>2번째 공지사항</p>',
      date: '2022.05.16',
    },
    {
      id: 3,
      title: '이것은 세번째 공지사항입니다.',
      content: '<p>3번째 공지사항</p>',
      date: '2022.08.14',
    },
  ],
  takeError: null,
  insertError: null,
  removeError: null,
  changeError: null,
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
    [INSERT_SUCCESS]: (state, { payload: info }) =>
      produce(state, (draft) => {
        //draft.infos.push(info);
      }),
    [INSERT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      insertError: error,
    }),
    [REMOVE_SUCCESS]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.infos.findIndex((info) => info.id === id);
        draft.infos.splice(index, 1);
      }),
    [REMOVE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      removeError: error,
    }),
    [CHANGE_SUCCESS]: (
      state,
      //{ payload: { idx, id, title, content, date } }
    ) =>
      produce(state, (draft) => {
        /*for (let i = 0; i < draft.infos.length; i++) {
          if (draft.infos[i].id === idx) {
            draft.infos[i] = { id, title, content, date };
          }
        }*/
      }),
    [CHANGE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      changeError: error,
    }),
  },
  initialState,
);

export default notify;
