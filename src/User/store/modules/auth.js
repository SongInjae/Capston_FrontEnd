import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { takeLatest, call } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../saga/createRequestSaga';
import * as authAPI from '../../api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const TEMP_SET_USER = 'auth/TEMP_SET_USER'; //새로고침 이후 임시 로그인 처리
const LOGOUT = 'auth/LOGOUT';

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/login');

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const logout = createAction(LOGOUT);

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

const loginSaga = createRequestSaga(LOGIN, authAPI.login);
function* logoutSaga() {
  try {

    //먼저 쿠키에서 세션id 가져와
    //
    yield call(authAPI.logout);//회원 생성
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}


export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  //yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const form = 'login';
const auth = handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: auth }) => ({
      ...state,
      auth,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      auth: null,
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
