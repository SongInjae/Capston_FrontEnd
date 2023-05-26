import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../../User/store/modules/loading';

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestCSVSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); //로딩 시작
    try {
      const response = yield call(request, action.payload);
      console.log(response.data.results[1].errors);
      for (let i = 1; i < response.data.results.length; i++) {
        response.data.results[i].errors = Object.entries(
          response.data.results[i].errors,
        );
      }
      yield put({
        type: SUCCESS,
        payload: response.data.results,
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
