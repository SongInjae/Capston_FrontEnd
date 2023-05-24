import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../img/sejong.png';
import { GrClose } from 'react-icons/gr';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/modules/auth';

const HeaderWrapper = styled.header`
  margin: 0 auto;
  display: flex;
  background-color: #a31432;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const SejongLogo = styled.img`
  width: 40px;
  height: 40px;
`;

const MainTitle = styled.div`
  color: white;
  font-weight: bold;
  font-size: 26px;
  margin-left: 130px;
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  display: inline-block;
  color: white;
  font-weight: 600;
  font-size: 12px;
`;

const LogoutBtn = styled.button`
  display: inline-block;
  color: white;
  border: 1px solid #a31432;
  border-color: white;
  border-radius: 8px;
  background-color: #a31432;
  font-weight: 600;
  font-size: 12px;
  margin-left: 10px;
  margin-right: 15px;
  margin-bottom: 15px;
`;

const LogoutWrapper = styled.div``;

const TabWrapper = styled.div``;

const HeaderTab = styled.li`
  display: inline-block;
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin-left: 15px;
  margin-right: 15px;
`;
const RightComponent = styled.div`
  text-align: right;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-right: 130px;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 90%;
  width: 50%;
  height: 90%;
  background: white;
  text-align: center;
`;

const ModalHeader = styled.div`
  display: flex;
  background-color: #a31432;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const ModalMainTitle = styled.div`
  color: white;
  font-weight: bold;
  font-size: 26px;
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;

  padding-left: 30px;
  align-items: baseline;
`;
const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

const TextFieldClass = styled.div`
  font-size: 15px;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: baseline;
`;
const TextField = styled.input`
  ::placeholder {
    color: lightgrey;
  }
  padding-left: 7px;
  width: 60%;
  height: 30px;
  border-width: 1px;
  border-style: solid;
  border-color: lightgrey;
  outline: none;
`;

const PwdChageBtn = styled.button`
  background-color: black;
  width: 200px;
  height: 30px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Courier New', Courier, monospace;
  border-radius: 8px;
  border-radius: 10;
  border: none;
  :hover {
    background-color: grey;
  }
`;

const UserInfoChageBtn = styled.button`
  background-color: black;
  width: 200px;
  height: 30px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Courier New', Courier, monospace;
  border-radius: 8px;
  border-radius: 10;
  border: none;
  :hover {
    background-color: grey;
  }
`;

function MyPage(props) {
  return (
    <Background>
      <ModalContainer>
        <ModalHeader>
          <ModalMainTitle>
            <SejongLogo src={logo}></SejongLogo> &nbsp;세종대학교 예약시스템
          </ModalMainTitle>
          <GrClose onClick={props.onXbtnClick} color="blue"></GrClose>
        </ModalHeader>

        <TitleWrapper>
          <span>비밀번호 변경</span>
          <span>비밀번호 변경시, 기존 비밀번호를 입력하셔야 합니다.</span>
        </TitleWrapper>
        <TextFieldWrapper>
          <TextFieldClass>기존 비밀번호</TextFieldClass>
          <TextField type="password"></TextField>
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextFieldClass>변경할 비밀번호</TextFieldClass>
          <TextField type="password"></TextField>
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextFieldClass>비밀번호 재확인</TextFieldClass>
          <TextField type="password"></TextField>
        </TextFieldWrapper>
        <PwdChageBtn>비밀번호 변경</PwdChageBtn>
        <TitleWrapper>
          <span>회원정보 변경</span>
        </TitleWrapper>
        <TextFieldWrapper>
          <TextFieldClass>이름</TextFieldClass>
          <TextField></TextField>
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextFieldClass>학번/교번</TextFieldClass>
          <TextField></TextField>
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextFieldClass>이메일</TextFieldClass>
          <TextField type="email"></TextField>
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextFieldClass>전화번호</TextFieldClass>
          <TextField></TextField>
        </TextFieldWrapper>
        <UserInfoChageBtn>회원정보 변경</UserInfoChageBtn>
      </ModalContainer>
    </Background>
  );
}

function Header() {
  const [modal, setModal] = useState(false);

  const clickMyPageBtn = () => {
    setModal(true);
  };
  const clickXModalBtn = () => {
    setModal(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    navigate('/');
    localStorage.removeItem('user');
  };
  return (
    <HeaderWrapper>
      <MainTitle>
        <SejongLogo src={logo}></SejongLogo> &nbsp;세종대학교 예약시스템
      </MainTitle>
      <RightComponent>
        <LogoutWrapper>
          <UserInfo>17011582 권형석</UserInfo>
          <LogoutBtn onClick={onLogout}>로그아웃</LogoutBtn>
        </LogoutWrapper>
        <TabWrapper>
          <HeaderTab>공지사항</HeaderTab>
          <HeaderTab>내 예약현황 조회</HeaderTab>
          <HeaderTab onClick={clickMyPageBtn}>마이페이지</HeaderTab>
          {modal === true ? (
            <MyPage onXbtnClick={clickXModalBtn}></MyPage>
          ) : null}
        </TabWrapper>
      </RightComponent>
    </HeaderWrapper>
  );
}

export default Header;
