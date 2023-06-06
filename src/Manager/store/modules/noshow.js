import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestNohowSaga, {
  createRequestActionTypes,
} from '../../saga/createRequestNoshowSaga';
import * as noshowAPI from '../../api/noshow';

const [TAKE, TAKE_SUCCESS, TAKE_FAILURE] =
  createRequestActionTypes('noshow/take');
const [TAKETYPE, TAKETYPE_SUCCESS, TAKETYPE_FAILURE] =
  createRequestActionTypes('noshow/takeType');

export const take = createAction(TAKE);
export const takeType = createAction(TAKETYPE);

const takeSaga = createRequestNohowSaga(TAKE, noshowAPI.takeInfo);
const takeTypeSaga = createRequestNohowSaga(TAKETYPE, noshowAPI.takeType);

export function* noshowSaga() {
  yield takeLatest(TAKE, takeSaga);
  yield takeLatest(TAKETYPE, takeTypeSaga);
}

const initialState = {
  data: [
    {
      user_type_name: '교수',
      noshow: 2,
    },
    {
      user_type_name: '대학원생',
      noshow: 3,
    },
    {
      user_type_name: '학부생',
      noshow: 1,
    },
  ],
  infos: [
    {
      id: 1,
      designation: '교직원',
      name: '김수용',
      number: '11011234',
      count: 2,
      email: 'tndyd47@sejong.ac.kr',
      booker: {
        user_type: 2,
      },
    },
    {
      id: 2,
      designation: '대학원생',
      name: '김민지',
      number: '11023193',
      count: 1,
      email: '2dls03@sejong.ac.kr',
      booker: {
        user_type: 3,
      },
    },
    {
      id: 3,
      designation: '대학원생',
      name: '신철민',
      number: '12011382',
      count: 2,
      email: '1dk23@sejong.ac.kr',
      booker: {
        user_type: 3,
      },
    },
    {
      id: 4,
      designation: '학생',
      name: '송인재',
      number: '18011857',
      count: 1,
      email: 'sjl@naver.com',
      booker: {
        user_type: 4,
      },
    },
  ],
  takeError: null,
  takeTypeError: null,
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
    [TAKETYPE_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      takeTypeError: null,
      data,
    }),
    [TAKETYPE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      takeTypeError: error,
    }),
  },
  initialState,
);

export default noshow;
