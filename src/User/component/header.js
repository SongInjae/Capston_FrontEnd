import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '/Users/kwon/Capston_FrontEnd/src/User/img/sejong.png';
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

const ModalComponent = styled.div`
  width: 800px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

export const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display : flex;
  justify-content : center;
  align-items : center;
  height : 100%;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
`;

export const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ExitBtn = styled(ModalBtn)`
background-color : #4000c7;
border-radius: 10px;
text-decoration: none;
margin: 10px;
padding: 5px 10px;
width: 40px;
height: 40px;
display : flex;
justify-content : center;
align-items : center;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
  role: 'dialog',
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 500px;
  height: 200px;
  background-color: #ffffff;
    >div.desc {
      margin: 50px;
      font-size: 20px;
      color: var(--coz-purple-600);
    }
`;

function Header() {
  const [modal, setModal] = useState(false);

  const clickMyPageBtn = () => {
    setModal(true);
  }
  const clickXModalBtn = () => {
    setModal(false);
  }
  return (
    <HeaderWrapper>
      <MainTitle>
        <SejongLogo src={logo}></SejongLogo> &nbsp;세종대학교 예약시스템
      </MainTitle>
      <RightComponent>
        <LogoutWrapper>
          <UserInfo>17011582 권형석</UserInfo>
          <LogoutBtn>로그아웃</LogoutBtn>
        </LogoutWrapper>
        <TabWrapper>
          <HeaderTab>공지사항</HeaderTab>
          <HeaderTab>내 예약현황 조회</HeaderTab>
          <HeaderTab onClick={clickMyPageBtn}>마이페이지</HeaderTab>
          {
            modal === true ? <ModalView onClick={(e) => e.stopPropagation()}>
              <ExitBtn onClick={clickXModalBtn}>x</ExitBtn>
              <div className='desc'></div>
            </ModalView> : null
          }
        </TabWrapper>
      </RightComponent>
    </HeaderWrapper>
  );
}

export default Header;