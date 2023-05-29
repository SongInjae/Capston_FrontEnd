import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../store/modules/loading';
import * as authAPI from '../api/auth';
import cookie from 'react-cookies';

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestLoginSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); //로딩 시작
    try {
      const response = yield call(request, action.payload);
      cookie.save('token', response.data.token, {
        path: '/',
      });
      const user = yield call(authAPI.mine);
      localStorage.setItem('user', JSON.stringify(user.data));
      yield put({
        type: SUCCESS,
        payload: user.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); //로딩 끝
  };
}
