//3.35.38.254:8000
import axios from "axios";

const initialState = { isLogin: false } // 초기상태


export const login = async (username, password) => {
    const response = await axios.post('http://3.35.38.254:8000/users/login', { username: username, password: password });
    return { type: 'LOGIN' };
}
export const logout = () => ({ type: 'LOGOUT' })


function UserLogin(currentState = initialState, action) { //리듀서 선언

    switch (action.type) {
        case 'LOGIN':
            return {
                ...currentState,
                date: action.date
            }
        case 'LOGOUT':
            return {

            }

        default:
            return currentState;
    }

}


export default UserLogin;


//login - 수동로그인 => 쿠키에서 sessionid와 csrftoken 삭제 후 요청
//logout or 브라우저 종료시 로그아웃 api 요청 (header 에 sessionid와  csrf 토큰 담아서)
