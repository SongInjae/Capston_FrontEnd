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
      const datablock = response.data.split(',,');
      const frame = [];
      for (let i = 1; i < datablock.length; i++) {
        const data = datablock[i].split(',');
        console.log(data);
        /*
        const col = {
          id: i,
          user_no: data[0],
          password: data[1],
          name: data[2],
          email: data[3],
          user_type: data[4],
          department: data[5],
        };
        */
        //frame.push(col);
      }
      console.log(frame);
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
