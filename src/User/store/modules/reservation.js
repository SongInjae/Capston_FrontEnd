//3.35.38.254:8000

import { useNavigate } from 'react-router-dom';
import * as reservationApi from '../../api/reservation';
import * as userInfoAPI from '../../api/userInfo';
import { takeLatest, call, put } from 'redux-saga/effects';

const initialState = { myReservationInfo: null, time: '', roomId: '', member: [], reservedTime: [], pickDay: '', reserveData: {}, userId: '', divideTime: [], reserveByDateData: [], memList: [], memIdList: [], } // 초기상태

export const getMyReservation = (userId, myReservationInfo) => ({ type: 'GET_MYRESERVE', userId, myReservationInfo });
export const getRoomReservation = (roomId, reservedTime, pickDay) => ({ type: 'GET_ROOMRESERVE', roomId: roomId, reservedTime: reservedTime, pickDay: pickDay });
export const makeReservation = (reserveData, userId) => ({ type: 'MAKE_RESERVE', reserveData: reserveData, userId });
export const deleteMyReservation = (id, userId) => ({ type: 'DELETE_RESERVE', id, userId });
export const authLocation = (reserveId, lat, log) => ({ type: 'AUTH_LOCATE', reserveId, lat, log });
export const getReservationByDate = (roomId, reserveByDateData, pickDay) => ({ type: 'GET_RESERVE_DATE', reserveByDateData, roomId, pickDay });
export const getUserNo = (data, memList, memIdList) => ({ type: 'GET_USERNO', data: data, memList: memList, memIdList: memIdList }); //액션 생성함수
export const cleanMemeber = () => ({ type: 'CLEAN_MEMBER', memList: [], memIdList: [] })
const divideTime = (alreadyReservedTime) => {
    let time = [];
    let start;
    let end;
    for (let i = 0; i < alreadyReservedTime.length; i++) {

        start = (alreadyReservedTime[i].split('-')[0]).split(':');
        end = (alreadyReservedTime[i].split('-')[1]).split(':');
        console.log(start);
        console.log(end);
        for (let i = parseInt(start[0]); i <= parseInt(end[0]); i++) {
            if (i === parseInt(end[0])) {
                if (end[1] === '30') {

                    time.push(`${parseInt(end[0])}:00-${parseInt(end[0])}:30`)
                    break;
                } else {
                    break;
                }
            }
            if (i === parseInt(start[0])) {
                if (start[1] === '30') {
                    time.push(`${parseInt(start[0])}:30-${parseInt(start[0]) + 1}:00`);

                } else {
                    time.push(`${parseInt(start[0])}:00-${parseInt(start[0])}:30`);
                    time.push(`${parseInt(start[0])}:30-${parseInt(start[0]) + 1}:00`);
                }
            }
            if (i < parseInt(end[0]) && i > parseInt(start[0])) {
                time.push(`${parseInt(i)}:00-${parseInt(i)}:30`)
                time.push(`${parseInt(i)}:30-${parseInt(i) + 1}:00`)
            }
        }
        // for (let i = parseInt(start.split(':')[0]); i <= parseInt(end.split(':')[0]); i++) {
        //     if (i === parseInt(start.split(':')[0])&&parseInt(start.split(':')[1]) === 30){
        //         time.push(`${start.split(':')[0]}:${start.split(':')[1]} - ${i+1}:00 `)
        //     }
        // }
    }
    return time;
}
export const transFormDate = (num) => {
    switch (num) {
        case 0:
            return 'SUN'
        case 1:
            return 'MON'
        case 2:
            return 'TUE'
        case 3:
            return 'WED'
        case 4:
            return 'THR'
        case 5:
            return 'FRI'
        case 6:
            return 'SAT'
        default:
            break;
    }
}

const checkScheduledOrNot = (allData, pickDay) => {
    let scheduleDay = new Date(pickDay).getDay();
    let scheduledTime = []
    console.log(allData.length);
    console.log(scheduleDay);
    for (let i = 0; i < allData.length; i++) {


        if (allData[i].day.includes(transFormDate(scheduleDay)) || new Date(allData[i].date).getDay() === scheduleDay) { // 선택한 날짜의 요일을 가지고 있으면
            if (allData[i].is_scheduled) {
                if (new Date(allData[i].date) <= new Date(pickDay)) {
                    scheduledTime.push(allData[i].start + '-' + allData[i].end);
                }
            } else {
                if (new Date(pickDay) <= new Date(allData[i].date)) {  //미래의 같은요일이랑 비교
                    scheduledTime.push(allData[i].start + '-' + allData[i].end);
                }
            }


        }
    }
    console.log(scheduledTime);
    return scheduledTime;
}

function* getMyReservationSaga(action) {
    try {
        const response = yield call(reservationApi.getMyReservation, action.userId);
        yield put({ type: 'GET_MYRESERVE_RESULT', myReservationInfo: response.data.results });

    } catch (e) {
        console.log(e);
        yield put({ type: 'GET_MYRESERVE_RESULT' });
    }
}

function* deleteMyReservationSaga(action) {
    try {

        yield call(reservationApi.deleteMyReservation, action.id);
        const response = yield call(reservationApi.getMyReservation, action.userId);
        alert('예약이 취소되었습니다.');
        yield put({ type: 'DELETE_RESERVE_RESULT', myReservationInfo: response.data.results });


    } catch (e) {
        console.log(e);
        yield put({ type: 'DELETE_RESERVE_RESULT' });
    }
}

function* getRoomReserve(action) {


    try {
        const response = yield call(reservationApi.getRoomReservation, action.roomId);
        console.log(response.data.results);
        let reserveList = [...response.data.results];
        let alreadyReservedTime = []
        console.log(action.pickDay);
        for (let i = 0; i < response.data.count; i++) {
            if (reserveList[i].date === action.pickDay) { // 선택한 날짜와 예약되어있는날짜가 같을때
                alreadyReservedTime.push(reserveList[i].start + "-" + reserveList[i].end);
                continue;
            } if (reserveList[i].is_scheduled === true && reserveList[i].day.includes(transFormDate(new Date(action.pickDay).getDay())) === true && new Date(reserveList[i].date) <= new Date(action.pickDay)) { //정기 예약이고 산텍된날짜의 요일이 포함되어있을는 예약
                alreadyReservedTime.push(reserveList[i].start + "-" + reserveList[i].end);
            }
        }
        console.log(alreadyReservedTime);
        let divideReservedTime = divideTime(alreadyReservedTime);
        console.log(divideReservedTime);

        yield put({ type: 'GET_ROOMRESERVE_RESULT', reservedTime: alreadyReservedTime, divideTime: divideReservedTime });
    } catch (e) {
        yield put({ type: 'GET_ROOMRESERVE_RESULT' });
    }
}

function* makeReserve(action) {
    try {
        console.log(action.reserveData)
        yield call(reservationApi.makeReservation, action.reserveData);//body 추가해야함
        const response = yield call(reservationApi.getMyReservation, action.userId);//body 추가해야함

        alert('예약되었습니다.');
        yield put({ type: 'MAKE_RESERVE_RESULT', myReservationInfo: response.data.results });

    } catch (e) {
        yield put({ type: 'MAKE_RESERVE_RESULT' });
    }
}

function* authLocate(action) {
    try {
        const response = yield call(reservationApi.authLocate, action.reserveId, action.lat, action.log);
        console.log(response.data);

        if (response.data.message === "complete") {
            alert('위치인증을 성공했습니다.');

        }

        yield put({ type: 'AUTH_LOCATE_RESULT' });

    } catch (e) {
        if (e.response.status === 400) {
            if (e.response.data.message === "not available time") {
                alert('위치인증가능 시간이 아닙니다.');
            } else {
                alert('현재위치를 확인해주세요.');
            }
        } else {
            alert('위치인증을 실패하였습니다.');
        }

        yield put({ type: 'AUTH_LOCATE_RESULT' })
    }
}



function* getReserveByDate(action) {

    try {
        const response = yield call(reservationApi.getRoomReservation, action.roomId);

        let reserveList = response.data.results; //예약된 리스트
        let alreadyReservedTime = [] // 이미 예약된 시간
        for (let i = 0; i < response.data.count; i++) {
            if (reserveList[i].date === action.pickDay) {
                alreadyReservedTime.push(reserveList[i].start + "-" + reserveList[i].end);
            }
        }
        console.log('정기')
        console.log(response.data.results);
        alreadyReservedTime = checkScheduledOrNot(response.data.results, action.pickDay);

        console.log(alreadyReservedTime);
        let divideReservedTime = divideTime(alreadyReservedTime);

        yield put({ type: 'GET_RESERVE_DATE_RESULT', reservedTime: alreadyReservedTime, divideTime: divideReservedTime });
    } catch (e) {
        yield put({ type: 'GET_RESERVE_DATE_RESULT' });
    }
}

export function* getExistUserNo(action) {
    let memList = action.memList;
    let memIdList = action.memIdList;
    try {
        const response = yield call(userInfoAPI.existUserNo, action.data);
        console.log(action);
        console.log(action.data);
        if (memList.includes(action.data)) {
            alert('이미 추가된 학번입니다.');
            yield put({ type: 'GET_USERNO_RESULT', memList: memList, memIdList: memIdList });
            return;
        }
        if (response.data.count === 0) {
            alert('존재하지 않는 학번/직번입니다.');
            yield put({ type: 'GET_USERNO_RESULT', memList: memList, memIdList: memIdList });
        } else {
            console.log(response.data);
            memList.push(action.data);
            memIdList.push(response.data.results[0].id);
            alert('추가되었습니다.');
            console.log(memList);
            console.log(memIdList);
            yield put({ type: 'GET_USERNO_RESULT', memList: memList, memIdList: memIdList });
        }
        console.log('add');
    } catch (e) {
        console.log(e);
        yield put({ type: 'GET_USERNO_RESULT', memList: memList, memIdList: memIdList });
        alert('존재하지 않는 학번/직번입니다.');
    }
}


export function* reservationSaga() {
    yield takeLatest('GET_MYRESERVE', getMyReservationSaga);
    yield takeLatest('MAKE_RESERVE', makeReserve);
    yield takeLatest('GET_ROOMRESERVE', getRoomReserve);
    yield takeLatest('DELETE_RESERVE', deleteMyReservationSaga);
    yield takeLatest('AUTH_LOCATE', authLocate);
    yield takeLatest('GET_RESERVE_DATE', getReserveByDate);
    yield takeLatest('GET_USERNO', getExistUserNo);
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
                myReservationInfo: action.myReservationInfo
            }

        case 'GET_ROOMRESERVE_RESULT': {
            return {
                ...currentState,
                reservedTime: action.reservedTime,
                divideTime: action.divideTime,
            }
        }


        case 'MAKE_RESERVE_RESULT':
            return {
                ...currentState,
                myReservationInfo: action.myReservationInfo,
            }

        case 'GET_RESERVE_DATE_RESULT':
            return {
                ...currentState,
                reserveByDateData: action.reserveByDateData,
                divideTime: action.divideTime,
            }
        case 'AUTH_LOCATE_RESULT':
            return {
                ...currentState,
            }
        case 'GET_USERNO_RESULT':
            return {
                ...currentState,
                memList: action.memList,
                memIdList: action.memIdList,
            }
        case 'CLEAN_MEMBER':
            return {
                ...currentState,
                memList: [],
                memIdList: [],
            }
        default:
            return currentState;

    }

}


export default reservation;


// {"booker":["This field is required."],"room":["This field is required."],"companion":["This field is required."]}