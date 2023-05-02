import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Room = styled.div`
    position: relative;
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

const RoomName = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    padding-left: 10px;
`;

const ReserveBtn = styled.button`
    position : absolute;
    bottom: 10px;
    right : 10px;
    font-weight: 500;
    font-size: 1.0rem;
    color: white;
    width: 5.5rem;
    height : 2.7rem;
    border-radius: 8px;
    border-width: 0px;
    background-color: black;
`;

function RoomComponent({ roomInfo }) {
    const navigate = useNavigate();

    const clickReserveBtn = () => {
        navigate('/reserve');
    }

    return (
        <Room>
            <RoomImage>
            </RoomImage>
            <RoomName>{roomInfo}</RoomName>
            <ReserveBtn onClick={clickReserveBtn}>예약하기</ReserveBtn>
        </Room>
    );
}

export default RoomComponent;