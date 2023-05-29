import styled, { css } from 'styled-components';
import logo from '../assets/sejong.png';
import MyReserveCalendar from './myReserveCalendar';
import Button from '../../Manager/components/Button';
import { useEffect, useState } from 'react';
import { getMyReservation, deleteMyReservation, authLocation } from '../store/modules/reservation';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../component/header';


const TitleBlock = styled.h2`
  margin-right: 27rem;
  text-align: center;
  margin-top: 1rem;
`;
const ReserveInfoBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  border: 2px solid lightgray;
  border-radius: 8px;
  width: 35rem;
  height: 9rem;
`;
const RoomInfoBlock = styled.div`
  width: 33rem;
  display: flex;
`;
const RoomImage = styled.img`
    width : 7rem;
    height : 7rem;
    border-radius: 8px;
`;
const RoomTextBlock = styled.div`
  margin-left: 1rem;
  flex-grow: 1;
`;
const Roomtext = styled.div`
  color: black;
  font-size: 0.9rem;
  ${(props) =>
    props.weight &&
    css`
      font-weight: bold;
      font-size: 1.5rem;
      color: black;
    `}
`;
const CancelButton = styled(Button)`
    margin-top: auto;
    float : right;
    bottom: 10px;
    right : 10px;
    font-weight: 500;
    font-size: 1.0rem;
    color: white;
    width: 5.5rem;
    height : 2.7rem;
    border-radius: 8px;
    border-width: 0px;
    background-color: #a31432;
`;

const LocationAuthBtn = styled(Button)`
 margin-top: auto;
    float : right;
    bottom: 10px;
    right : 10px;
    font-weight: 500;
    font-size: 1.0rem;
    color: white;
    width: 5.5rem;
    height : 2.7rem;
    border-radius: 8px;
    border-width: 0px;
    background-color: #a31432;
`

const MyReservation = () => {
  const reserveRoomInfo = useSelector(state => state.reservation.myReservationInfo);
  const myId = useSelector(state => state.userInfo.myInfo.id);
  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
  }


  const [locationInfo, setLocationInfo] = useState({});

  const dispatch = useDispatch();

  const getLocation = () => {
    const { geolocation } = navigator

    if (!geolocation) {
      alert('Geolocation is not supported.')
      return
    }

    return new Promise((resolve, reject) => { geolocation.getCurrentPosition(resolve, reject, geolocationOptions) });
  }

  useEffect(() => {
    dispatch(getMyReservation(myId));
    console.log(reserveRoomInfo);
  }, [dispatch]);
  const onClickDeleteBtn = (id) => {
    dispatch(deleteMyReservation(id));
    window.location.reload();

    dispatch(getMyReservation(id));
  }

  const onClickLocationAuthBtn = async (id) => {
    try {
      let position = await getLocation();
      setLocationInfo(position);
      console.log(position);
      dispatch(authLocation(id, position.coords.latitude, position.coords.longitude));
    } catch (e) {
      alert(e);
    }

  }

  const infoList = reserveRoomInfo && reserveRoomInfo.map((info) => (

    <ReserveInfoBlock>
      <RoomInfoBlock>
        <RoomImage src={info.room.images.image} />
        <RoomTextBlock>
          <Roomtext weight={true}>{info.room.name}</Roomtext>
          <Roomtext>
            일정 : {info.date}
          </Roomtext>
          <Roomtext>시간 : {info.start.split(':')[0]}:{info.start.split(':')[1]}-{info.end.split(':')[0]}:{info.end.split(':')[1]}</Roomtext>
          <CancelButton onClick={() => onClickDeleteBtn(info.id)}>예약 취소</CancelButton>

          <LocationAuthBtn onClick={() => onClickLocationAuthBtn(info.id)}>인증하기</LocationAuthBtn>
          {/* <Roomtext weight={true}>{info.location}</Roomtext>
          <Roomtext>
            일정 : {info.year}년 {info.month}월 {info.day}일
          </Roomtext>
          <Roomtext>시간 : {info.time}</Roomtext>
          <CancelButton>예약 취소</CancelButton> */}
        </RoomTextBlock>
      </RoomInfoBlock>
    </ReserveInfoBlock>
  ));

  return (
    <div>
      <Header></Header>
      <MyReserveCalendar infos={reserveRoomInfo} />
      {/* <MyReserveCalendar infos={infos} /> */}

      <TitleBlock>나의 예약목록</TitleBlock>
      {infoList}
    </div>
  );
};

export default MyReservation;
