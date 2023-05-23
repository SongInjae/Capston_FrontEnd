//3.35.38.254:8000

import * as roomAPI from '../../api/roomApi';
import { takeLatest, call, put } from 'redux-saga/effects';


const initialState = { room: null, roomsInfo: [] } // 초기상태

export const getRooms = roomsInfo => ({ type: 'GET_ROOM', roomsInfo })

export const pickRoom = room => ({ type: 'PICK_ROOM', room }); //액션 생성함수



function* getRoomsSaga() {

    try {
        const response = yield call(roomAPI.getRoomsInfo);
        console.log(response.data);
        yield put({ type: 'GET_ROOM_RESULT', roomsInfo: response.data.results });

    } catch (e) {
        yield put({ type: 'GET_ROOM_RESULT', roomInfo: [] });
    }
}

export function* roomSaga() {

    yield takeLatest('GET_ROOM', getRoomsSaga); //action saga 연결
}

function roomReducer(currentState = initialState, action) { //리듀서 선언

    switch (action.type) {
        case 'PICK_ROOM':
            return {
                ...currentState,
                room: action.room

            }
        case 'GET_ROOM_RESULT':
            return {
                ...currentState,
                roomsInfo: action.roomsInfo
            }
        default:
            return currentState;
    }

}


export default roomReducer;


//login - 수동로그인 => 쿠키에서 sessionid와 csrftoken 삭제 후 요청
//logout or 브라우저 종료시 로그아웃 api 요청 (header 에 sessionid와  csrf 토큰 담아서)


// 쿠키 - 세션 id    로컬 스토리지 - 세션 id    인증이 필요한 api 호출 시, 필요한 세션 id 

//