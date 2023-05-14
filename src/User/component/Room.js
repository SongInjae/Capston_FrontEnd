import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pickRoom } from "../user_store/room";
const Room = styled.div`
    border: solid;
    border-width: 2px;
    border-color: lightgray;
    border-radius: 8px;
    padding : 15px;
    display: flex;
    width : 29rem;
    margin : 10px;
    @media only screen and (max-width: 768px) {
    width: 45%;
    }
    //flex-direction: column;
    //justify-content: center;
    /* align-items: center; */
`;
const RoomImage = styled.div`
    background-color: lightgray;
    width : 8rem;
    height : 8rem;
    border-radius: 8px;
`;

const RoomNameWrapper = styled.div`
    width : 14rem;
`

const RoomName = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    padding-left: 10px;
`;
const ReserveBtnWrapper = styled.div`
    display : flex;
    flex-direction: column;

    
`;
const ReserveBtn = styled.button`
    margin-top: auto;
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

    const clickReserveBtn = (selectedRoom) => {
        navigate('/reserve');
        dispatch(pickRoom(selectedRoom));
    }


    return (
        <Room>
            <RoomImage />
            <RoomNameWrapper>
                <RoomName>{roomInfo}</RoomName>
            </RoomNameWrapper>
            <ReserveBtnWrapper>
                <ReserveBtn onClick={() => clickReserveBtn(roomInfo)}>예약하기</ReserveBtn>
            </ReserveBtnWrapper>

        </Room>
    );
}

export default RoomComponent;