import React from 'react';
import styled from 'styled-components';
import UserCalendar from '../component/calendar';
import RoomComponent from '../component/Room';
import Header from '../component/header';

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
      <Header></Header>
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
