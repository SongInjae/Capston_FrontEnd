import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestLoginSaga, {
  createRequestActionTypes,
} from '../../saga/createRequestLoginSaga';
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


const loginSaga = createRequestLoginSaga(LOGIN, authAPI.login);


export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
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
