import * as userInfoAPI from '../../api/userInfo';
import { takeLatest, call, put } from 'redux-saga/effects';


const initialState = { myInfo: {}, userInfo: [], currentPwd: '', changedPwd: '', changedName: '', changedEmail: '', userNoCount: 0, getUserNo: '' } // 초기상태

export const getMyInfo = (myInfo) => ({ type: 'GET_MYINFO', myInfo: myInfo });

export const changePassword = (data) => ({ type: 'CHANGE_PWD', data: data });

export const changeUserInfo = (data) => ({ type: 'CHANGE_USERINFO', data: data }); //액션 생성함수

export const getUserNo = (userNo) => ({ type: 'GET_USERNO', getUserNo: userNo }); //액션 생성함수

export const googleConnect = () => ({ type: 'CONNECT_GOOGLE' });

export const googleRevoke = () => ({ type: 'REVOKE_GOOGLE' });

export function* getMine() {
    const response = yield call(userInfoAPI.getMyInformation);
    try {
        yield put({ type: 'GET_MYINFO_RESULT', myInfo: response.data });

    } catch (e) {
        yield put({ type: 'GET_MYINFO_RESULT', myInfo: {} });
    }
}

export function* patchPassword(action) {
    let bodyData = {
        current_password: action.data.currentpwd,
        new_password: action.data.changedpwd,
    }
    try {
        const response = yield call(userInfoAPI.changePassword(bodyData));
        yield put({ type: 'CHANGE_PWD_RESULT' });
        alert('비밀번호를 변경하였습니다.');

    } catch (e) {
        console.log(e);
        alert('비밀번호를 확인하세요');
        yield put({ type: 'CHANGE_PWD_RESULT' });
    }
}
export function* patchUserInfo(action) {
    console.log(action)
    const response = yield call(userInfoAPI.changeUserInfo(action.data.id, action.data.data));
    console.log(response.data);
    try {
        yield put({ type: 'CHANGE_USERINFO_RESULT' });

        alert('정보를 변경하였습니다.');

    } catch (e) {
        yield put({ type: 'CHANGE_USERINFO_RESULT' });
    }
}

export function* getExistUserNo(action) {
    const response = yield call(userInfoAPI.existUserNo(action.getUserNo));
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Max-Age", "1800");
    response.setHeader("Access-Control-Allow-Headers", "content-type");
    response.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    console.log(response.data)
    try {
        yield put({ type: 'GET_USERNO_RESULT', userNoCount: response.data.count });
    } catch (e) {
        yield put({ type: 'GET_USERNO_RESULT' });
    }
}

export function* connectToGoogle() {
    try {
        const response = yield call(userInfoAPI.connectGoogle);
        console.log(response.data);
        yield put({ type: 'CONNECT_GOOGLE_RESULT' });
    } catch (e) {
        yield put({ type: 'CONNECT_GOOGLE_RESULT' });
    }
}

export function* revokeGoogle() {
    try {
        const response = yield call(userInfoAPI.revokeGoogle);

        yield put({ type: 'REVOKE_GOOGLE' });
    } catch (e) {
        yield put({ type: 'REVOKE_GOOGLE' });
    }
}

export function* userInfoSaga() {
    yield takeLatest('GET_MYINFO', getMine);
    yield takeLatest('CHANGE_PWD', patchPassword);
    yield takeLatest('CHANGE_USERINFO', patchUserInfo);
    yield takeLatest('GET_USERNO', getExistUserNo);
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
                currendPwd: action.currentPwd,
                changedPwd: action.changedPwd,
            }
        case 'CHANGE_USERINFO_RESULT':
            return {
                ...currentState,
            }
        case 'GET_USERNO_RESULT':
            return {
                ...currentState,
                getUserNo: action.getUserNo,
                userNoCount: action.userNoCount,
            }
        case 'CONNECT_GOOGLE_RESULT':
            return {
                ...currentState,
            }
        case 'REVOKE_GOOGLE':
            return {
                ...currentState,
            }

        default:
            return currentState;
    }

}


export default userInfo;
