import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { login } from "../user_store/login";
const SignInWrapper = styled.div`
  width:600px;
  height:500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const SignInPage = styled.div`
    width:100vw;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F1F1F1;
`;

const TitleText = styled.div`
    font-size: 30px;
    font-weight: 700;
    margin-bottom : 20px;

`;

const IdInput = styled.input`
    ::placeholder{
        color: lightgrey
    }
    padding-left: 7px;
    margin-bottom : 10px;
    width : 300px;
    height : 40px;
    border-radius: 7px;
    border-width: 1px;  
    border-style: solid;
    border-color: lightgrey;
    outline : none;
`;


const PwdInput = styled.input`
    ::placeholder{
        color: lightgrey;
    }
    padding-left: 7px;
    margin-bottom : 10px;
    width : 300px;
    height : 40px;
    border-radius: 7px;
    border-width: 1px;
    border-style: solid;
    border-color: lightgrey;
    outline: none;
`;

const Loginbtn = styled.button`
    background-color: black;
    width : 300px;
    height : 50px;
    color : white;
    font-size: large;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
    border-radius: 8px;
    border-radius: 10;
    border: none;
    :hover{
        background-color: black;
    }
`;


function SignIn() {
    const [isAuthenticated, setAuth] = useState(false);
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeId = (e) => {
        setId(e.target.value);
    }

    const onChangePwd = (e) => {
        setPwd(e.target.value);
    }

    const isValidate = () => {
        if (id === "" || pwd === "") {

            return false;
        }
        return true
    }
    useEffect(() => {
        if (isAuthenticated) {
            navigate("main");
            console.log(isAuthenticated);
        }
    },);

    const onClickLoginBtn = () => {
        dispatch(login(id, pwd))
        if (!isValidate()) {
            alert('아이디 또는 패스워드를 입력하세요.');
            return;
        }
        else {
            setAuth((isAuthenticated) => !isAuthenticated);
            //로그인 api 호출
        }
    }

    const onClickAdminBtn = () => {
        navigate("admin");
    }



    return (
        <SignInPage>
            <SignInWrapper>
                <TitleText>SEJONG MEET-UP</TitleText>

                <IdInput placeholder="ID" maxLength={20} onChange={onChangeId}></IdInput>
                <PwdInput placeholder="Password" type="password" maxLength={20} onChange={onChangePwd}></PwdInput>
                <Loginbtn onClick={onClickLoginBtn}>로그인</Loginbtn>

                <Loginbtn onClick={onClickAdminBtn}>어드민 로그인</Loginbtn>
            </SignInWrapper>
        </SignInPage>
    );
}

export default SignIn;