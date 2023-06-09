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
      if (response.data.error_occured === true) {
        for (let i = 1; i < response.data.results.length; i++) {
          response.data.results[i].errors = Object.entries(
            response.data.results[i].errors,
          );
        }
        alert('에러가 발생했습니다. 에러 파일을 확인해주세요.');
      } else {
        alert('성공적으로 추가되었습니다.');
      }
      yield put({
        type: SUCCESS,
        payload: response.data,
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
