//3.35.38.254:8000

const initialState = { room: null } // 초기상태

export const pickRoom = room => ({ type: 'PICK_ROOM', room }); //액션 생성함수

function roomReducer(currentState = initialState, action) { //리듀서 선언

    switch (action.type) {
        case 'PICK_ROOM':
            return {
                ...currentState,
                room: action.room
            }

        default:
            return currentState;
    }

}


export default roomReducer;


//login - 수동로그인 => 쿠키에서 sessionid와 csrftoken 삭제 후 요청
//logout or 브라우저 종료시 로그아웃 api 요청 (header 에 sessionid와  csrf 토큰 담아서)
