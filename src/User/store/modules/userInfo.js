import * as userInfoAPI from '../../api/userInfo';
import { takeLatest, call, put } from 'redux-saga/effects';


const initialState = { userInfo: [], currentPwd: '', changedPwd: '', changedName: '', changedEmail: '', userNoCount: 0, getUserNo: '' } // 초기상태

export const changePassword = (data) => ({ type: 'CHANGE_PWD', data: data })

export const changeUserInfo = () => ({ type: 'CHANGE_USERINFO' }); //액션 생성함수

export const getUserNo = (userNo) => ({ type: 'GET_USERNO', getUserNo: userNo }); //액션 생성함수

export function* patchPassword(action) {
    let bodyData = {
        current_password: action.data.currentpwd,
        new_password: action.data.changedpwd,
    }
    console.log(bodyData);
    const response = yield call(userInfoAPI.changePassword(bodyData));
    console.log(response.data)
    try {
        yield put({ type: 'CHANGE_PWD' });

    } catch (e) {
        alert("비밀번호를 확인해주세요");
        yield put({ type: 'CHANGE_PWD' });
    }
}
export function* patchUserInfo(id, changedInfo) {

    const response = yield call(userInfoAPI.changeUserInfo(id, changedInfo));
    console.log(response.data);
    try {
        yield put({ type: 'CHANGE_USERINFO' });

    } catch (e) {
        yield put({ type: 'CHANGE_USERINFO' });
    }
}

export function* getExistUserNo(action) {
    const response = yield call(userInfoAPI.existUserNo(action.getUserNo));

    try {
        yield put({ type: 'GET_USERNO', userNoCount: response.data.count });
    } catch (e) {
        yield put({ type: 'GET_USERNO' });
    }
}

export function* userInfoSaga() {
    yield takeLatest('CHANGE_PWD', patchPassword);
    yield takeLatest('CHANGE_USERINFO', patchUserInfo);
    yield takeLatest('GET_USERNO');
}

function userInfo(currentState = initialState, action) { //리듀서 선언

    switch (action.type) {
        case 'CHANGE_PWD':
            return {
                ...currentState,
                currendPwd: action.currentPwd,
                changedPwd: action.changedPwd,
            }
        case 'CHANGE_USERINFO':
            return {
                ...currentState,
            }
        case 'GET_USERNO':
            return {
                ...currentState,
                getUserNo: action.getUserNo,
                userNoCount: action.userNoCount,
            }
        default:
            return currentState;
    }

}


export default userInfo;
