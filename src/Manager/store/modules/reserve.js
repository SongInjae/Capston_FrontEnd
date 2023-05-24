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
//const removeSaga = createRequestSaga(REMOVE, reserveAPI.removeInfo);

export function* reserveSaga() {
  yield takeLatest(TAKE, takeSaga);
  //yield takeLatest(REMOVE, removeSaga);
}

const initialState = {
  infos: [
    {
      id: 1,
      date_year: 2023,
      date_month: 4,
      date_day: 16,
      name: '한동일',
      room: '대양AI센터 835호',
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
      room: '대양AI센터 836호',
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
      room: '대양AI센터 835호',
      designation: '학생',
      time: '15:00 - 16:00',
      email: 'dfsjal@sejong.ac.kr',
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
