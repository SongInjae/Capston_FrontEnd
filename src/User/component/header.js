import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/sejong.png';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import auth from '../store/modules/auth';
import { logout } from '../store/modules/auth';
import { changePassword, changeUserInfo, googleConnect, googleRevoke } from '../store/modules/userInfo';

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

const InfoTitle = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
`

const PwdInfoTitle = styled.span`
  font-size: 0.3rem;
  font-weight: 500;
  color : gray;
`


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

const GoogleConnectionBtn = styled.div`
  font-size: 11px;
  border-style: solid;
  border-color: lightgray;
  margin-left: 3px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 3px;
  padding-right: 3px;
  text-align: center;
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
  const userInfo = useSelector(state => state.userInfo.myInfo);
  const dispatch = useDispatch();
  const [currentpwd, setCurrentpwd] = useState('');
  const [changedpwd, setChangedpwd] = useState('');
  const [checkpwd, setCheckpwd] = useState('');
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const onClickChangePwd = () => {

    if (changedpwd === checkpwd && changedpwd.length >= 8) {
      dispatch(changePassword({ currentpwd, changedpwd }));
    } else {
      alert("비밀번호를 확인해주세요!");
    }
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onClickChangeUserInfo = () => {
    let data = {};
    if (userInfo.name !== name) {
      data.name = name;
    }
    if (userInfo.email !== email) {
      data.email = email;
    }
    if (name !== userInfo.name || email !== userInfo.email) {
      dispatch(changeUserInfo({ id: userInfo.id, data: data }));
    } else {
      alert('바뀐 정보가 없습니다.')
    }
  }
  const onClickConnectGoogle = () => {
    console.log('click');
    dispatch(googleConnect());
  }
  const onClickRevokeGoogle = () => {
    dispatch(googleConnect());
  }

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
          <InfoTitle>비밀번호 변경</InfoTitle>
          <PwdInfoTitle>비밀번호 변경시, 기존 비밀번호를 입력하셔야 합니다.</PwdInfoTitle>
        </TitleWrapper>
        <TextFieldWrapper>
          <TextFieldClass>기존 비밀번호</TextFieldClass>
          <TextField type="password" onChange={(event) => setCurrentpwd(event.target.value)}></TextField>
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextFieldClass>변경할 비밀번호</TextFieldClass>
          <TextField type="password" onChange={(event) => setChangedpwd(event.target.value)}></TextField>
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextFieldClass>비밀번호 재확인</TextFieldClass>
          <TextField type="password" onChange={(event) => setCheckpwd(event.target.value)}></TextField>
        </TextFieldWrapper>
        <PwdChageBtn onClick={onClickChangePwd}>비밀번호 변경</PwdChageBtn>
        <TitleWrapper>
          <InfoTitle>회원정보 변경</InfoTitle>
        </TitleWrapper>
        <TextFieldWrapper>
          <TextFieldClass>이름</TextFieldClass>
          <TextField defaultValue={userInfo.name} onChange={onChangeName}></TextField>
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextFieldClass>학번/교번</TextFieldClass>
          <TextField value={userInfo.user_no} disabled={true}></TextField>
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextFieldClass>이메일</TextFieldClass>
          <TextField defaultValue={userInfo.email} type="email" onChange={onChangeEmail} ></TextField>

          {/* <a href="3.35.38.254:8000" onClick={onClickConnectGoogle}>연동하기</a> */}
          <GoogleConnectionBtn onClick={onClickConnectGoogle}>연동하기</GoogleConnectionBtn>
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextFieldClass disabled={true}>전화번호</TextFieldClass >
          <TextField></TextField>
        </TextFieldWrapper>
        <UserInfoChageBtn onClick={onClickChangeUserInfo}>회원정보 변경</UserInfoChageBtn>
      </ModalContainer>
    </Background>
  );
}

function Header() {

  const userInfo = useSelector(state => state.userInfo.myInfo);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const clickSearchMyReservation = () => {
    navigate('/main/reserve');
  }
  const clickNotice = () => {
    navigate('/notice');

  }

  const clickMyPageBtn = () => {
    setModal(true);
  };
  const clickXModalBtn = () => {
    setModal(false);
  };

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <HeaderWrapper>
      <MainTitle>
        <SejongLogo src={logo}></SejongLogo> &nbsp;세종대학교 예약시스템
      </MainTitle>
      <RightComponent>
        <LogoutWrapper>
          <UserInfo>{userInfo.user_no} {userInfo.name}</UserInfo>
          <LogoutBtn onClick={onLogout}>로그아웃</LogoutBtn>
        </LogoutWrapper>
        <TabWrapper>
          <HeaderTab onClick={clickNotice}>공지사항</HeaderTab>
          <HeaderTab onClick={clickSearchMyReservation}>내 예약현황 조회</HeaderTab>
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
