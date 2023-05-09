import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/header";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineAddCircle } from "react-icons/md";
import { AiFillWarning } from "react-icons/ai"
import { GrClose } from 'react-icons/gr';
const Divider = styled.div`
    width : 40vw;
    height : 7px;
    background-color: #FBFBFB;
    margin-top: 15px;
    margin-bottom: 15px;
`

const ReserveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const RoomTitle = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;            
    font-size: 1.5rem;
    font-weight: bold;
    width : 40vw;
`
const RoomImage = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    width : 40vw;
    height : 30vw;
    border-radius: 10px;
    background-color: lightgray;
`
const ToolWrapper = styled.div`
    display: inline-block;
    flex-direction: row;
    align-content: flex-start;
    width : 40vw;
`

const Tool = styled.div`
    margin-left : 0.2rem;
    margin-right : 0.2rem;
    float: left;
`

const ToolImage = styled.div`
    border-radius: 5px;
    border-style: solid; 
    border-color : lightgray;
    width : 4rem;
    height : 4rem;

`;
const ToolTitle = styled.div`
    width: 4rem;
    margin-top: 0.1rem;
    text-align: center;
    font-size: 0.1rem;
    font-weight: bold;
`
const DatePickWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
;
`
const DatePickButton = styled.div`
    background-color: #F4F4F4;
    color : #373737;
    padding-left: 10rem;
    padding-right: 10rem;
    padding-top: 7px;
    padding-bottom: 7px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 15px;
`
const DropdownIcon = styled(IoIosArrowDown)`

`;

const TimePickbtn = styled.div`
    border-style: solid;
    border-color: lightgray;
    border-radius: 10px;
    width : 40vw;
    margin-bottom: 5px;
`
const TimeTitle = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 0.5rem;
    font-weight: 500;
    font-size: 1rem;
    color : gray;
    cursor: pointer;
`
const MeetingNameInput = styled.input`
    ::placeholder{
        color: gray
    }
    font-weight:500;
    font-size: 1rem;
    padding-left: 0.5rem;
    margin-bottom : 10px;
    width : 40vw;
    height : 40px;
    border-radius: 10px;
    border-style: solid;
    border-color: lightgrey;
    outline : none;
`;

const MemberTitle = styled.div`
    width: 40vw;
    font-size: 18px;
    font-weight: bold;
`
const AddMemberButton = styled.div`
    display: flex;
    width: 40vw;
    margin-top: 5px;
    align-items: center;
    font-size: 13px;
`
const AddMemberIcon = styled(MdOutlineAddCircle)`
    width : 15px;
    height : 15px;
`
const MemberWrapper = styled.div`
    width: 40vw;
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
`
const Member = styled.span`
    padding-left: 5px;
    padding-right: 5px;
`
const WarningIcon = styled(AiFillWarning)`
`
const WarningTitle = styled.div`
    display: flex;
    align-items: center;
    width : 40vw;
    font-size: 18px;
    font-weight: bold;
`
const Warning = styled.div`
    width : 40vw;
    font-size: 14px;
`

const ReservationButton = styled.button`
    background-color: #a31432;
    width : 35vw;
    height : 50px;
    color : white;
    font-size: large;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
    border-radius: 8px;
    border-radius: 10;
    border: none;
    :hover{
        background-color: #EF9090;
    }
`;
const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.50);
    z-index: 0;
`;

const ModalContainer = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-height: 90%;
    width: 30%;
    height: 20%;
    border-radius: 10px;
    background: white;
    text-align: center;
`;
const ModalHeader = styled.div`
    display: flex;
    background-color: #a31432;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;
const ModalXBtn = styled(GrClose)`

`;
const ModalMainTitle = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;
function ReservingPage() {
    const toolList = ["HDMI", "빔 프로젝트", "화이트보드"]
    const TimeList = [
        "9:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 13:00",
        "13:00 - 14:00",
        "14:00 - 15:00",
        "15:00 - 16:00",
        "16:00 - 17:00",
        "16:00 - 17:00"]
    const memberList = ["17011582 권형석", "17011477 목승주"];
    const [members, setMembers] = useState(memberList)
    const [isTimeBtnClicked, setIsTimeBtnClicked] = useState(false);
    const [isAddMemeberClicked, setIsAddMemeberClicked] = useState(false);
    const [selectedTime, setSelectedTime] = useState("시간을 선택하세요");
    const clickTimePickBtn = (time) => {
        setSelectedTime(time);
        setIsTimeBtnClicked(!isTimeBtnClicked);
    }
    return (
        <div>
            <Header></Header>
            <ReserveWrapper>
                <RoomImage ></RoomImage>
                <RoomTitle>대양 AI 센터 835호</RoomTitle>
                <ToolWrapper>
                    {toolList.map((tool) => (

                        <Tool>
                            <ToolImage></ToolImage>
                            <ToolTitle>{tool}</ToolTitle>
                        </Tool>
                    ))}
                </ToolWrapper>
                <Divider></Divider>
                <DatePickWrapper>
                    <DatePickButton>2022년 10월 11일 <DropdownIcon></DropdownIcon></DatePickButton>
                </DatePickWrapper>
                <TimePickbtn><TimeTitle onClick={() => setIsTimeBtnClicked(!isTimeBtnClicked)}>{selectedTime}</TimeTitle>{
                    isTimeBtnClicked === true ? TimeList.map((time) => (<TimeTitle onClick={() => clickTimePickBtn(time)}>{time}</TimeTitle>)) : null
                }</TimePickbtn>
                <MeetingNameInput placeholder="회의명을 입력하세요(선택)"></MeetingNameInput>
                <Divider></Divider>
                <MemberTitle>참석멤버</MemberTitle>
                <AddMemberButton onClick={() => setIsAddMemeberClicked(!isAddMemeberClicked)}><AddMemberIcon></AddMemberIcon>참석멤버 추가</AddMemberButton>
                {isAddMemeberClicked === true ?
                    <Background>
                        <ModalContainer>
                            <ModalHeader>
                                <ModalMainTitle>참석멤버 추가</ModalMainTitle>
                                <ModalXBtn color="white" onClick={() => setIsAddMemeberClicked(!isAddMemeberClicked)}></ModalXBtn>
                            </ModalHeader>
                        </ModalContainer>
                    </Background> : null}
                <MemberWrapper>    {
                    members.map((member) => (<Member>{member}</Member>))
                }</MemberWrapper>
                <Divider></Divider>
                <WarningTitle><WarningIcon></WarningIcon>유의사항</WarningTitle>
                <Warning>1. 첫번째 유의사항 <br></br>2. 두번째 유의사항 <br></br>3. 세번째 유의사항</Warning>
                <ReservationButton>예약하기</ReservationButton>
            </ReserveWrapper>
        </div>
    );
}

export default ReservingPage;