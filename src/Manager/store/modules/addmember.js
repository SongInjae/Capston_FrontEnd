import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../saga/createRequestSaga';
import * as memberAPI from '../../api/manager';
import createRequestDataSaga from '../../saga/createRequestDataSaga';
import createRequestCSVSaga from '../../saga/createRequestCSV';

const CHANGE_FIELD = 'addmembers/CHANGE_FIELD';
const EMPTY = 'addmembers/EMPTY';

const [EXCEL, EXCEL_SUCCESS, EXCEL_FAILURE] =
  createRequestActionTypes('addmembers/EXCEL');
const [BULKRM, BULKRM_SUCCESS, BULKRM_FAILURE] =
  createRequestActionTypes('addmembers/BULKRM');
const [TAKE, TAKE_SUCCESS, TAKE_FAILURE] =
  createRequestActionTypes('addmembers/take');
const [INSERT, INSERT_SUCCESS, INSERT_FAILURE] =
  createRequestActionTypes('addmembers/INSERT');
const [REMOVE, REMOVE_SUCCESS, REMOVE_FAILURE] =
  createRequestActionTypes('addmembers/REMOVE');
const [CHANGE, CHANGE_SUCCESS, CHANGE_FAILURE] =
  createRequestActionTypes('addmembers/CHANGE');

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key, //id, designation, name, number, email
  value, //실제 바꾸려는 값
}));
export const excel = createAction(EXCEL, (formData) => formData);
export const bulkDelete = createAction(BULKRM, (data) => data);
export const insert = createAction(
  INSERT,
  ({ user_type, name, user_no, email, password, department }) => ({
    user_type,
    name,
    user_no,
    email,
    password,
    department,
  }),
);
export const change = createAction(
  CHANGE,
  ({ id, user_type, name, user_no, email, department }) => ({
    id,
    user_type,
    name,
    user_no,
    email,
    department,
  }),
);
export const remove = createAction(REMOVE, (id) => id);
export const empty = createAction(EMPTY);

//export const take = createAction(TAKE, (headers) => headers);
export const take = createAction(TAKE);

const excelSaga = createRequestCSVSaga(EXCEL, memberAPI.excelInfo);
const bulkrmSaga = createRequestDataSaga(BULKRM, memberAPI.bulkDelete);
const takeSaga = createRequestSaga(TAKE, memberAPI.takeAllInfo);
const addSaga = createRequestSaga(INSERT, memberAPI.addInfo);
const removeSaga = createRequestSaga(REMOVE, memberAPI.removeInfo);
const changeSaga = createRequestSaga(CHANGE, memberAPI.changeInfo);

export function* addmembersSaga() {
  yield takeLatest(EXCEL, excelSaga);
  yield takeLatest(BULKRM, bulkrmSaga);
  yield takeLatest(TAKE, takeSaga);
  yield takeLatest(INSERT, addSaga);
  yield takeLatest(REMOVE, removeSaga);
  yield takeLatest(CHANGE, changeSaga);
}

const initialState = {
  info: [
    {
      id: 1,
      name: '한동일',
      user_no: '12345678',
      email: 'dsjl@sejong.ac.kr',
      pwd: 1234,
      user_type: {
        id: 2,
        name: '교수',
        possible_duration: 12,
      },
    },
    {
      id: 2,
      name: '멍멍이',
      user_no: '41345678',
      email: 'dsjl@naver.com',
      pwd: 1234,
      user_type: {
        id: 3,
        name: '대학원생',
        possible_duration: 2,
      },
    },
    {
      id: 3,
      name: '송인재',
      user_no: '12562678',
      email: 'jgh@naver.com',
      pwd: 1234,
      user_type: {
        id: 4,
        name: '학부생',
        possible_duration: 1,
      },
    },
  ],
  excelInfo: [],
  deleteNumber: null,
  excelError: null,
  bulkrmError: null,
  takeError: null,
  insertError: null,
  removeError: null,
  changeError: null,
};

const addmembers = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft[key] = value;
      }),
    [REMOVE_SUCCESS]: (state, { payload: id }) =>
      produce(state, (draft) => {
        //const index = draft.info.findIndex((info) => info.id === id);
        //draft.info.splice(index, 1);
      }),
    [REMOVE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      removeError: error,
    }),
    [CHANGE_SUCCESS]: (
      state,
      //{ payload: { idx, id, designation, name, user_no, email, pwd } },
    ) =>
      produce(state, (draft) => {
        //for (let i = 0; i < draft.info.length; i++) {
        //if (draft.info[i].id === idx) {
        //draft.info[i] = { id, designation, name, user_no, email, pwd };
        //}
        //}
      }),
    [CHANGE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      changeError: error,
    }),
    [TAKE_SUCCESS]: (state, { payload: info }) => ({
      ...state,
      takeError: null,
      info,
    }),
    [TAKE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      takeError: error,
    }),
    [INSERT_SUCCESS]: (state, { payload: info }) =>
      produce(state, (draft) => {
        //draft.info.push(info);
      }),
    [INSERT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      insertError: error,
    }),
    [EXCEL_SUCCESS]: (state, { payload: excelInfo }) => ({
      ...state,
      excelInfo,
    }),
    [EXCEL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      excelError: error,
    }),
    [BULKRM_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      deleteNumber: data,
    }),
    [BULKRM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      bulkrmError: error,
    }),
    [EMPTY]: (state) => ({
      ...state,
      excelInfo: [],
    }),
  },
  initialState,
);

export default addmembers;
