//3.35.38.254:8000
import * as reportApi from '../../api/report';

import { takeLatest, call, put } from 'redux-saga/effects';


const initialState = { body: null, reportInfo: [] } // 초기상태

export const getReport = () => ({ type: 'GET_REPORT' })

export const postReport = (body) => ({ type: 'POST_REPORT', body }); //액션 생성함수

export const deleteReport = () => ({ type: 'DELETE_REPORT' });

function* reportGet() {
    try {
        const response = yield call(reportApi.getReport);
        yield put({ type: 'GET_REPORT_RESULT', reportInfo: response.data.results });
    } catch (e) {
        yield put({ type: 'GET_REPORT_RESULT', reportInfo: [] });
    }
}

function* reportPost(action) {
    try {
        const response = yield call(reportApi.postReport, action.body);
        yield put({ type: 'POST_REPORT_RESULT' });
    } catch (e) {
        yield put({ type: 'POST_REPORT_RESULT', reportInfo: [] });
    }
}

function* reportDelete() {
    try {
        const response = yield call(reportApi.deleteReport);
        yield put({ type: 'DELETE_REPORT_RESULT' });
    } catch (e) {
        yield put({ type: 'DELETE_REPORT_RESULT', reportInfo: [] });
    }
}

export function* reportSaga() {
    yield takeLatest('GET_REPORT', reportGet);
    yield takeLatest('POST_REPORT', reportPost);
    yield takeLatest('DELETE_REPORT', reportDelete);

}


function report(currentState = initialState, action) { //리듀서 선언

    switch (action.type) {
        case 'GET_REPORT_RESULT':
            return {
                ...currentState,
                reportInfo: action.reportInfo
            }
        case 'POST_REPORT_RESULT':
            return {
                ...currentState,
            }
        case 'DELETE_REPORT_RESULT':
            return {
                ...currentState,

            }
        default:
            return currentState;
    }

}

export default report;
