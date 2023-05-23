import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../saga/createRequestSaga';
import createRequestRoomSaga from '../../saga/createRequestRoomSaga';
import * as roomAPI from '../../api/room';

const CHANGE_FIELD = 'rooms/CHANGE_FIELD';
const [TAKE, TAKE_SUCCESS, TAKE_FAILURE] =
  createRequestActionTypes('rooms/take');
const [INSERT, INSERT_SUCCESS, INSERT_FAILURE] =
  createRequestActionTypes('rooms/INSERT');
const [REMOVE, REMOVE_SUCCESS, REMOVE_FAILURE] =
  createRequestActionTypes('rooms/REMOVE');
const [CHANGE, CHANGE_SUCCESS, CHANGE_FAILURE] =
  createRequestActionTypes('rooms/CHANGE');

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const take = createAction(TAKE);

export const insert = createAction(INSERT, (formdata) => formdata);
export const change = createAction(CHANGE, ({ id, formData }) => ({
  id,
  formData,
}));
export const remove = createAction(REMOVE, (id) => id);

const takeSaga = createRequestSaga(TAKE, roomAPI.takeAllInfo);
const addSaga = createRequestRoomSaga(INSERT, roomAPI.addInfo);
const removeSaga = createRequestSaga(REMOVE, roomAPI.removeInfo);
const changeSaga = createRequestSaga(CHANGE, roomAPI.changeInfo);

export function* roomSaga() {
  yield takeLatest(TAKE, takeSaga);
  yield takeLatest(INSERT, addSaga);
  yield takeLatest(REMOVE, removeSaga);
  yield takeLatest(CHANGE, changeSaga);
}

const initialState = {
  rooms: [
    {
      id: 1,
      name: '대양AI센터 835호',
      amenities: '빔프로젝트, 컴퓨터 2대',
      discription: '뒷정리 잘하고 갈 것',
      images: {
        image: '',
      },
    },
    {
      id: 2,
      name: '대양AI센터 836호',
      amenities: '빔프로젝트, 컴퓨터 1대',
      discription: '뒷정리 잘하고 갈 것',
      images: {
        image: '',
      },
    },
  ],
  takeError: null,
  insertError: null,
  removeError: null,
  changeError: null,
};

const rooms = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft[key] = value;
      }),
    [TAKE_SUCCESS]: (state, { payload: rooms }) => ({
      ...state,
      takeError: null,
      rooms,
    }),
    [TAKE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      takeError: error,
    }),
    [INSERT_SUCCESS]: (state, { payload: { room } }) =>
      produce(state, (draft) => {
        //draft.rooms.push(room);
        console.log(room);
      }),
    [INSERT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      insertError: error,
    }),
    [REMOVE_SUCCESS]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.rooms.findIndex((room) => room.id === id);
        draft.rooms.splice(index, 1);
      }),
    [REMOVE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      removeError: error,
    }),
    [CHANGE_SUCCESS]: (
      state,
      //{ payload: { idx, id, name, amenities, discription, images } },
    ) =>
      produce(state, (draft) => {
        /*for (let i = 0; i < draft.rooms.length; i++) {
          if (draft.rooms[i].id === idx) {
            draft.rooms[i] = { id, name, amenities, discription, images };
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

export default rooms;
