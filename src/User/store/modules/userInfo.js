import * as userInfoAPI from '../../api/userInfo';
import { takeLatest, call, put } from 'redux-saga/effects';

const initialState = { myInfo: {}, userInfo: [], changedName: '', changedEmail: '', user_no: '', memList: [], memIdList: [], data: {} } // 초기상태

export const getMyInfo = () => ({ type: 'GET_MYINFO' });

export const changePassword = (data) => ({ type: 'CHANGE_PWD', data: data });

export const changeUserInfo = (user_no, data) => ({ type: 'CHANGE_USERINFO', user_no: user_no, data: data }); //액션 생성함수



export const removeMember = (data, memList, memIdList) => ({ type: 'REMOVE_MEMBER', data: data, memList: memList, memIdList: memIdList })

export const googleConnect = (user_no) => ({ type: 'CONNECT_GOOGLE', user_no });

export const googleRevoke = () => ({ type: 'REVOKE_GOOGLE' });

export function* getMine() {
    try {
        const response = yield call(userInfoAPI.getMyInformation);
        yield put({ type: 'GET_MYINFO_RESULT', myInfo: response.data });

    } catch (e) {
        yield put({ type: 'GET_MYINFO_RESULT', });
    }
}

export function* patchPassword(action) {
    let bodyData = {
        current_password: action.data.currentpwd,
        new_password: action.data.changedpwd,
    }

    try {
        const response = yield call(userInfoAPI.changePassword, bodyData);

        yield put({ type: 'CHANGE_PWD_RESULT' });
        alert('비밀번호를 변경하였습니다.');

    } catch (e) {
        alert('비밀번호를 확인하세요');
        yield put({ type: 'CHANGE_PWD_RESULT' });
    }
}

export function* patchUserInfo(action) {
    try {
        const response = yield call(userInfoAPI.changeUserInfo(action.user_no, action.data));
        yield put({ type: 'CHANGE_USERINFO_RESULT' });

    } catch (e) {
        alert('정보를 변경하였습니다.');

        yield put({ type: 'CHANGE_USERINFO_RESULT' });
    }
}



export function* removeMem(action) {
    let memList = action.memList;

    let memIdList = action.memIdList;
    let index = memList.indexOf(action.data);

    let removed = memList.filter((element) => element !== action.data);

    memIdList[index] = "0";
    let removedIdList = memIdList.filter((element) => element !== "0");

    yield put({ type: 'REMOVE_MEMBER_RESULT', memList: removed, memIdList: removedIdList });
}

export function* connectToGoogle(action) {

    try {
        const response = yield call(userInfoAPI.connectGoogle, action.user_no);
        yield put({ type: 'CONNECT_GOOGLE_RESULT' });
    } catch (e) {
        yield put({ type: 'CONNECT_GOOGLE_RESULT' });
    }
}


export function* revokeGoogle() {
    try {
        const response = yield call(userInfoAPI.revokeGoogle);

        yield put({ type: 'REVOKE_GOOGLE_RESULT' });
    } catch (e) {
        yield put({ type: 'REVOKE_GOOGLE_RESULT' });
    }
}

export function* userInfoSaga() {
    yield takeLatest('GET_MYINFO', getMine);
    yield takeLatest('CHANGE_PWD', patchPassword);
    yield takeLatest('CHANGE_USERINFO', patchUserInfo);
    yield takeLatest('REMOVE_MEMBER', removeMem);
    yield takeLatest('CONNECT_GOOGLE', connectToGoogle);
    yield takeLatest('REVOKE_GOOGLE', connectToGoogle);
}



function userInfo(currentState = initialState, action) { //리듀서 선언

    switch (action.type) {
        case 'GET_MYINFO_RESULT':
            return {
                ...currentState,
                myInfo: action.myInfo,
            }
        case 'CHANGE_PWD_RESULT':
            return {
                ...currentState,
                data: action.data,
            }
        case 'CHANGE_USERINFO_RESULT':
            return {
                ...currentState,
            }

        case 'REMOVE_MEMBER_RESULT':
            return {
                ...currentState,
                memList: action.memList,
                memIdList: action.memIdList,
            }
        case 'CONNECT_GOOGLE_RESULT':
            return {
                ...currentState,
            }
        case 'REVOKE_GOOGLE_RESULT':
            return {
                ...currentState,
            }

        default:
            return currentState;
    }

}


export default userInfo;
