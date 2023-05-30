import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pickRoom } from "../store/modules/room";
import { select } from "react-cookies";
const Room = styled.div`
    border: solid;
    border-color: lightgray;
    border-radius: 8px;
    padding : 15px;
    display: flex;
    width : 29rem;
    margin : 10px;
   
    //flex-direction: column;
    //justify-content: center;
    /* align-items: center; */
`;
const RoomImage = styled.img`
    width : 8rem;
    height : 8rem;
    border-radius: 8px;
    flex : 1;
`;

const RoomNameWrapper = styled.div`
`

const RoomInfoWrapper = styled.div`
    display: flex;
    flex:2;
    flex-direction: column;
`

const RoomName = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    padding-left: 10px;
    flex:1;
`;


const ReserveBtnWrapper = styled.div`
    display: flex;
    flex:2;
    margin: auto 0 0 auto;
    flex-direction: row;   
`;
const ReserveBtn = styled.button`
    margin-top: auto;
    margin-left : 3px;
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
function RoomComponent({ roomInfo }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userType = useSelector(state => state.userInfo.myInfo.user_type.id);
    const possible_duration = useSelector(state => state.userInfo.myInfo.user_type.possible_duration);
    const selectDate = useSelector(state => state.dateReducer.date);
    const clickScheduleReserveBtn = (selectedRoom) => {
        console.log(userType);
        if (userType !== 2) {
            alert('권한이 없습니다.');    //-> 정기예약 기능 개발되면 주석 풀기
            return;
        }
        dispatch(pickRoom(selectedRoom));
        navigate('/schedule_reserve')
    }


    const clickReserveBtn = (selectedRoom) => {
        const toolDay = new Date();
        const today = new Date();
        const possibleDate = new Date(toolDay.setDate(toolDay.getDate() + possible_duration));
        if (possible_duration !== 0) {
            if (selectDate.getFullYear() === today.getFullYear && selectDate.getMonth() === today.getMonth() && selectDate.getDate() === today.getDate()) {
                console.log(0);
                navigate('/reserve');
                dispatch(pickRoom(selectedRoom));
                return;
            }

            else if (possibleDate < selectDate) {
                console.log(1);
                alert('예약이 불가능한 날짜입니다.');
                return;
            } else if (selectDate < today && selectDate.getDate() !== today.getDate()) {
                alert('예약이 불가능한 날짜입니다.');
                return;
            }
        } else {
            if (selectDate < today && selectDate.getDate() !== today.getDate()) {
                alert('예약이 불가능한 날짜입니다.');
                return;
            }
        }

        navigate('/reserve');
        dispatch(pickRoom(selectedRoom));
    }


    return (
        <Room>
            <RoomImage src={roomInfo.images.image} />
            <RoomInfoWrapper>
                <RoomNameWrapper>
                    <RoomName>{roomInfo.name}</RoomName>
                </RoomNameWrapper>
                <ReserveBtnWrapper>
                    <ReserveBtn onClick={() => clickScheduleReserveBtn(roomInfo)}>정기예약</ReserveBtn>
                    <ReserveBtn onClick={() => clickReserveBtn(roomInfo)}>일반예약</ReserveBtn>
                </ReserveBtnWrapper>

            </RoomInfoWrapper>

        </Room>
    );
}

export default RoomComponent;