import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../saga/createRequestSaga';
import * as regularAPI from '../../api/regular';

const [TAKE, TAKE_SUCCESS, TAKE_FAILURE] =
  createRequestActionTypes('regular/take');
const [REMOVE, REMOVE_SUCCESS, REMOVE_FAILURE] =
  createRequestActionTypes('regular/REMOVE');

export const take = createAction(TAKE);
export const remove = createAction(REMOVE, (id) => id);

const takeSaga = createRequestSaga(TAKE, regularAPI.takeAllInfo);
const removeSaga = createRequestSaga(REMOVE, regularAPI.removeInfo);

export function* regularSaga() {
  yield takeLatest(TAKE, takeSaga);
  yield takeLatest(REMOVE, removeSaga);
}

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
  takeError: null,
  removeError: null,
};

const regular = handleActions(
  {
    [TAKE_SUCCESS]: (state, { payload: regularInfo }) => ({
      ...state,
      takeError: null,
      regularInfo,
    }),
    [TAKE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      takeError: error,
    }),
    [REMOVE_SUCCESS]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.infos.findIndex((info) => info.id === id);
        draft.infos.splice(index, 1);
      }),
    [REMOVE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      takeError: error,
    }),
  },
  initialState,
);

export default regular;
