import styled, { css } from 'styled-components';
import logo from '../img/sejong.png';
import MyReserveCalendar from './myReserveCalendar';
import Button from '../../Manager/components/Button';

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

const TitleBlock = styled.h2`
  margin-right: 27rem;
  text-align: center;
  margin-top: 1rem;
`;
const ReserveInfoBlock = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem auto;
  border: 2px solid lightgray;
  border-radius: 8px;
  width: 35rem;
  height: 8rem;
  padding-top: 0.9rem;
`;
const RoomInfoBlock = styled.div`
  width: 33rem;
  height: 100%;
  padding-left: 2rem;
  display: flex;
`;
const RoomImageBlock = styled.div`
  background-color: gray;
  width: 6rem;
  height: 6rem;
`;
const RoomTextBlock = styled.div`
  margin-left: 1rem;
  flex-grow: 1;
`;
const Roomtext = styled.div`
  color: gray;
  ${(props) =>
    props.weight &&
    css`
      font-weight: bold;
      font-size: 1.5rem;
      color: black;
    `}
`;
const CancelButton = styled(Button)`
  width: 4.5rem;
  height: 1.7rem;
  float: right;
`;

const MyReservation = () => {
  const infos = [
    {
      id: 1,
      year: 2023,
      month: 5,
      day: 26,
      time: '15:00-16:30',
      location: '대양 AI센터 835호',
    },
    {
      id: 2,
      year: 2023,
      month: 5,
      day: 23,
      time: '18:00-19:00',
      location: '대양 AI센터 836호',
    },
  ];

  const infoList = infos.map((info) => (
    <ReserveInfoBlock>
      <RoomInfoBlock>
        <RoomImageBlock />
        <RoomTextBlock>
          <Roomtext weight={true}>{info.location}</Roomtext>
          <Roomtext>
            일정 : {info.year}년 {info.month}월 {info.day}일
          </Roomtext>
          <Roomtext>시간 : {info.time}</Roomtext>
          <CancelButton>예약 취소</CancelButton>
        </RoomTextBlock>
      </RoomInfoBlock>
    </ReserveInfoBlock>
  ));

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
      <MyReserveCalendar infos={infos} />
      <hr />
      <TitleBlock>나의 예약목록</TitleBlock>
      {infoList}
    </div>
  );
};

export default MyReservation;
