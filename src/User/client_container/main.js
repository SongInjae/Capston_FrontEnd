import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserCalendar from '../component/calendar';
import RoomComponent from '../component/Room';
import Header from '../component/header';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from '../store/modules/room';
import { getMyInfo } from '../store/modules/userInfo';
import { getMyReservation } from '../store/modules/reservation';
import MyReserveCalendar from './myReserveCalendar';

const MainBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`

const RoomsWrapper = styled.div`
  display: grid;
  
  grid-template-columns: repeat(2, 0.5fr);
  @media screen and (max-width: 500px){
    display: flex;
    width : 100vw;
    flex-direction: column;
  }
`;


function UserMain() {
  const roomsInfo = useSelector(state => state.roomReducer.roomsInfo);
  const myId = useSelector(state => state.userInfo.myInfo.id);
  const reserveRoomInfo = useSelector(state => state.reservation.myReservationInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInfo());
    dispatch(getRooms());
    dispatch(getMyReservation(myId));
    if (roomsInfo !== []) return;

  }, [dispatch, myId],);


  const roomInfo = [
    '대양 AI센터 835호',
    '대양 AI센터 836호',
    '대양 AI센터 837호',
  ];

  return (
    <div>
      <Header></Header>
      <MainBodyWrapper>
        <MyReserveCalendar infos={reserveRoomInfo}></MyReserveCalendar>
        {/* <UserCalendar></UserCalendar> */}

        <RoomsWrapper>
          {roomsInfo && roomsInfo.map((room) => (
            <RoomComponent roomInfo={room}></RoomComponent>
          ))}
        </RoomsWrapper>
      </MainBodyWrapper>

    </div>
  );
}

export default UserMain;
