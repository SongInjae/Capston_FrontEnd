import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestResultSaga, {
  createRequestActionTypes,
} from '../../saga/createRequestResultSaga';
import * as boardAPI from '../../api/board';

const [TAKE, TAKE_SUCCESS, TAKE_FAILURE] =
  createRequestActionTypes('board/Take');

export const take = createAction(TAKE);

const takeSaga = createRequestResultSaga(TAKE, boardAPI.takeAllInfo);

export function* boardSaga() {
  yield takeLatest(TAKE, takeSaga);
}

const initialState = {
  infos: [
    {
      id: 1,
      title: '이것은 첫번째 공지사항입니다.',
      content: '<p>1번째 공지사항</p>',
      start: '2023-05-22T17:03:39.202245',
      end: '2023-05-22T17:03:39.202245',
    },
    {
      id: 2,
      title: '이것은 두번째 공지사항입니다.',
      content: '<p>2번째 공지사항</p>',
      start: '2023-05-22T17:03:39.202245',
      end: '2023-05-23T17:03:39.202245',
    },
    {
      id: 3,
      title: '이것은 세번째 공지사항입니다.',
      content: '<p>3번째 공지사항</p>',
      start: '2023-05-22T17:03:39.202245',
      end: '2023-05-24T17:03:39.202245',
    },
  ],
  takeError: null,
};

const board = handleActions(
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
  },
  initialState,
);

export default board;
