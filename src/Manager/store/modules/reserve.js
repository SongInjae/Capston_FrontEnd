import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../saga/createRequestSaga';
import * as reserveAPI from '../../api/reserve';

const [TAKE, TAKE_SUCCESS, TAKE_FAILURE] =
  createRequestActionTypes('reserve/take');
const [REMOVE, REMOVE_SUCCESS, REMOVE_FAILURE] =
  createRequestActionTypes('reserve/REMOVE');

export const take = createAction(TAKE);
export const remove = createAction(REMOVE, (id) => id);

const takeSaga = createRequestSaga(TAKE, reserveAPI.takeAllInfo);
const removeSaga = createRequestSaga(REMOVE, reserveAPI.removeInfo);

export function* reserveSaga() {
  yield takeLatest(TAKE, takeSaga);
  yield takeLatest(REMOVE, removeSaga);
}

const initialState = {
  infos: [
    {
      id: 1,
      date: '2023-04-16',
      room: {
        name: '대양AI센터 835호',
      },
      booker: {
        name: '한동일',
        user_type: 2,
        email: 'sfjl@naver.com',
      },
      start: '2023-04-16T10:15:11.648000',
      end: '2023-04-16T10:15:11.648000',
    },
    {
      id: 2,
      date: '2023-04-10',
      room: {
        name: '대양AI센터 836호',
      },
      booker: {
        name: '멍멍이',
        user_type: 3,
        email: 'sfjl@naver.com',
      },
      start: '2023-04-10T18:00:00.648000',
      end: '2023-04-10T20:00:00.648000',
    },
    {
      id: 3,
      date: '2023-05-11',
      room: {
        name: '대양AI센터 835호',
      },
      booker: {
        name: '송인재',
        user_type: 4,
        email: 'sfjlsd@naver.com',
      },
      start: '2023-05-11T15:00:00.648000',
      end: '2023-05-11T16:00:00.648000',
    },
  ],
  takeError: null,
  removeError: null,
};

const reserve = handleActions(
  {
    [TAKE_SUCCESS]: (state, { payload: infos }) => ({
      ...state,
      takeError: null,
      infos,
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

export default reserve;
