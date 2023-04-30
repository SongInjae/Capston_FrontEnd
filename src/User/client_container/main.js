import React from 'react';
import styled from 'styled-components';
import logo from '../img/sejong.png';
import UserCalendar from '../component/calendar';
import RoomComponent from '../component/Room';

const Header = styled.header`
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

const RoomsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0.5fr);
  padding-left: 16%;
  padding-right: 16%;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

function UserMain() {
  const roomInfo = [
    '대양 AI센터 835호',
    '대양 AI센터 836호',
    '대양 AI센터 837호',
  ];

  return (
    <div>
      <Header>
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
            <HeaderTab>마이페이지</HeaderTab>
          </TabWrapper>
        </RightComponent>
      </Header>
      <UserCalendar></UserCalendar>
      <RoomsWrapper>
        {roomInfo.map((room) => (
          <RoomComponent roomInfo={room}></RoomComponent>
        ))}
      </RoomsWrapper>
    </div>
  );
}

export default UserMain;
