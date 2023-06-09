import styled, { css } from 'styled-components';
import MyReserveCalendar from './myReserveCalendar';
import Button from '../../Manager/components/Button';
import { useEffect, useState } from 'react';
import { getMyReservation, deleteMyReservation, authLocation } from '../store/modules/reservation';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../component/header';
import { getMyInfo } from '../store/modules/userInfo';
import Loading from '../../Manager/components/Loading';

const Dummy = styled.div`
  height:0px;
`

const TitleBlock = styled.h2`
  text-align: left;
  width: 29rem;
  font-size: 1.3rem;
  margin-top: 1rem;
  @media screen and (max-width: 480px){
    font-size: 3rem;
    margin-left: 0.5rem;
  }
`;
const ReserveInfoBlock = styled.div`
  
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  border: 1px solid lightgray;
  border-radius: 8px;
  width: 29rem;
  height: 9rem;
  margin : 10px;
  padding-left: 10px;
  padding-right: 10px;
  @media screen and (max-width: 480px){
    width : 90vw;
    height : auto;
    margin-left: 0.5rem;
    margin-top: 3px;
    margin-bottom: 3px;
  }
`;
const RoomInfoBlock = styled.div`
  width: 33rem;
  display: flex;
  @media screen and (max-width: 500px){
   width : 100%;
   align-items: center;
   margin-top: 3px;
   margin-bottom: 3px;
  }
`;
const RoomImage = styled.img`
    width : 8rem;
    height : 8rem;
    border-radius: 8px;
    @media screen and (max-width: 500px){
      width: 15rem;
      height: 15rem;
  }
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
      font-size: 1.2rem;
      color: black;
    `}
`;
const ButtonWrapper = styled.div`
  margin-top: 10px;
  
`
const CancelButton = styled(Button)`
    margin-top: auto;
    margin-left : 3px;
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
    @media screen and (max-width: 500px){
      width : 13rem;
      height : auto;
      padding : 1rem;
      margin-top: 3px;
      margin-bottom: 3px;
    }
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
    @media screen and (max-width: 500px){
      width : 13rem;
      height : auto;
      padding : 1rem;
      margin-top: 3px;
      margin-bottom: 3px;
    }
`

const MyReserveBlock = styled.div`
  display : flex;
  flex-direction: row;
  justify-content: center;
  @media screen and (max-width: 480px){
    flex-direction: column;
    align-items: center;
  }
  
`

const InfoBlock = styled.div`
  display : flex;
  flex-direction: column;
  
`



const MyReservation = () => {
  const reserveRoomInfo = useSelector(state => state.reservation.myReservationInfo);
  const myId = useSelector(state => state.userInfo.myInfo.id);
  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
  }
  const { loading_insert } = useSelector(({ loading }) => ({ loading_insert: loading['GET_ROOMRESERVE'] }))

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
    dispatch(getMyInfo());
    dispatch(getMyReservation(myId));

  }, [dispatch, myId]);

  const onClickDeleteBtn = (id) => {
    dispatch(deleteMyReservation(id, myId));
    dispatch(getMyReservation(myId));
  }

  const onClickLocationAuthBtn = async (id) => {
    try {
      // let position = await getLocation();
      // setLocationInfo(position);
      //dispatch(authLocation(id, position.coords.latitude, position.coords.longitude));
      dispatch(authLocation(id, 37.551100, 127.075750));
    } catch (e) {
      //alert(e);
    }

  }

  const commoninfoList = reserveRoomInfo && reserveRoomInfo.map((info) => (
    !info.is_scheduled ?
      <ReserveInfoBlock>
        <RoomInfoBlock>
          <RoomImage src={info.room.images.image} />
          <RoomTextBlock>
            <Roomtext weight={true}>{info.room.name}</Roomtext>
            <Roomtext>
              일정 : {info.date}
            </Roomtext>
            <Roomtext>시간 : {info.start.split(':')[0]}:{info.start.split(':')[1]}-{info.end.split(':')[0]}:{info.end.split(':')[1]}</Roomtext>
            <ButtonWrapper>
              <CancelButton onClick={() => onClickDeleteBtn(info.id)}>예약 취소</CancelButton>
              <LocationAuthBtn onClick={() => onClickLocationAuthBtn(info.id)}>인증하기</LocationAuthBtn>
            </ButtonWrapper>
          </RoomTextBlock>
        </RoomInfoBlock>
      </ReserveInfoBlock> : <Dummy></Dummy>
  ));

  const scheduledInfoList = reserveRoomInfo && reserveRoomInfo.map((info) => {
    if (info.is_scheduled) {
      return <ReserveInfoBlock>
        <RoomInfoBlock>
          <RoomImage src={info.room.images.image} />
          <RoomTextBlock>
            <Roomtext weight={true}>{info.room.name}</Roomtext>
            <Roomtext>
              시작날짜 : {info.date}
            </Roomtext>
            <Roomtext>예약시간 : {info.start.split(':')[0]}:{info.start.split(':')[1]}-{info.end.split(':')[0]}:{info.end.split(':')[1]}</Roomtext>

            <ButtonWrapper>
              <CancelButton onClick={() => onClickDeleteBtn(info.id)}>예약 취소</CancelButton>
              <LocationAuthBtn onClick={() => onClickLocationAuthBtn(info.id)}>인증하기</LocationAuthBtn>
            </ButtonWrapper>

            {/* <Roomtext weight={true}>{info.location}</Roomtext>
        <Roomtext>
          일정 : {info.year}년 {info.month}월 {info.day}일
        </Roomtext>
        <Roomtext>시간 : {info.time}</Roomtext>
        <CancelButton>예약 취소</CancelButton> */}
          </RoomTextBlock>
        </RoomInfoBlock>
      </ReserveInfoBlock>
    }

  }

  );

  return (
    <div>
      <Header></Header>
      <MyReserveCalendar infos={reserveRoomInfo} />
      {/* <MyReserveCalendar infos={infos} /> */}
      <MyReserveBlock>

        <InfoBlock>
          <TitleBlock>나의 일반예약목록</TitleBlock>
          {commoninfoList}
        </InfoBlock>
        <InfoBlock>
          <TitleBlock>나의 정기예약목록</TitleBlock>
          {scheduledInfoList}
        </InfoBlock>

      </MyReserveBlock>

    </div>
  );
};

export default MyReservation;
