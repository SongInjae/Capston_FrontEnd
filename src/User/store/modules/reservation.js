//3.35.38.254:8000

import * as reservationApi from '../../api/reservation';
import { takeLatest, call, put } from 'redux-saga/effects';

const initialState = { myReservationInfo: null } // 초기상태

export const getMyReservation = myReservationInfo => ({ type: 'GET_MYRESERVE', myReservationInfo })
export const deleteMyReservation = (removeId) => ({ type: 'DELETE_RESERVE', removeId });
function* getMyReservationSaga() {
    const response = yield call(reservationApi.getMyReservation);
    console.log(response);
    try {
        yield put({ type: 'GET_MYRESERVE_RESULT', myReservationInfo: response.data.results });

    } catch (e) {
        console.log(e);
        yield put({ type: 'GET_MYRESERVE_RESULT' });
    }
}

function* deleteMyReservationSaga(action) {
    console.log(action.removeId)
    const response = yield call(reservationApi.deleteMyReservation(action.removeId));
    console.log(response);
    try {
        yield put({ type: 'DELETE_RESERVE_RESULT' });

    } catch (e) {
        console.log(e);
        yield put({ type: 'DELETE_RESERVE_RESULT' });
    }
}

export function* reservationSaga() {
    yield takeLatest('GET_MYRESERVE', getMyReservationSaga);
    yield takeLatest('DELETE_RESERVE', deleteMyReservationSaga);
}



function reservation(currentState = initialState, action) { //리듀서 선언

    switch (action.type) {
        case 'GET_MYRESERVE_RESULT':
            return {
                ...currentState,
                myReservationInfo: action.myReservationInfo,
            }
        case 'DELETE_RESERVE_RESULT':
            return {
                ...currentState,
            }
        default:
            return currentState;
    }

}


export default reservation;


