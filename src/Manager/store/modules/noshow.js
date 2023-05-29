import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../saga/createRequestSaga';
import * as noshowAPI from '../../api/noshow';

const [TAKE, TAKE_SUCCESS, TAKE_FAILURE] =
  createRequestActionTypes('remove/take');
const [REMOVE, REMOVE_SUCCESS, REMOVE_FAILURE] =
  createRequestActionTypes('remove/REMOVE');

export const take = createAction(TAKE);
export const remove = createAction(REMOVE, (id) => id);

const takeSaga = createRequestSaga(TAKE, noshowAPI.takeAllInfo);
const removeSaga = createRequestSaga(REMOVE, noshowAPI.removeInfo);

export function* noshowSaga() {
  yield takeLatest(TAKE, takeSaga);
  yield takeLatest(REMOVE, removeSaga);
}

const initialState = {
  data: [2, 3, 1],
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
  takeError: null,
  removeError: null,
};

const noshow = handleActions(
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

export default noshow;
