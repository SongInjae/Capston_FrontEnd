import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../component/header";
import format from "date-fns/format";
import { reservation, getRoomReservation, makeReservation } from "../store/modules/reservation";
import { useDispatch, useSelector } from "react-redux";
import { getUserNo, removeMember } from "../store/modules/userInfo";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineAddCircle } from "react-icons/md";
import { AiFillWarning } from "react-icons/ai"
import { GrClose } from 'react-icons/gr';
import projector from '../assets/projector.png';
const PartOne = styled.div`
    padding: 10px;
    margin-top: 10px;
    background-color: white;
    border-radius: 12px;
`;

const PartTwo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin-top: 10px;
    background-color: white;
    border-radius: 12px;
`;

const PartThree = styled.div`
    padding: 10px;
    margin-top: 10px;
    background-color: white;
    border-radius: 12px;
`;

const PartFour = styled.div`
    padding: 10px;
    margin-top: 10px;
    background-color: white;
    border-radius: 12px;
`;
const ReserveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EEEEEE;
`;
const RoomTitle = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;            
    font-size: 1.5rem;
    font-weight: bold;
    width : 40vw;
`
const RoomImage = styled.img`
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
    width : 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left : 0.2rem;
    margin-right : 0.2rem;
`

const ToolImageBorder = styled.div`
    display: flex;
    border-radius: 5px;
    border-style: solid; 
    border-color : lightgray;
    justify-content: center;
    align-items: center;
    width : 4rem;
    height : 4rem;

`;

const ToolImage = styled.img`
    border-radius: 5px;
    width : 2.5rem;
    height : 2.5rem;

`;
const ToolTitle = styled.div`
    width: 5rem;
    margin-top: 0.1rem;
    text-align: center;
    font-size: 12px;   
    font-weight: 500;
`
const DatePickWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
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
    width : 40vw;
    border-style: solid;
    border-color: lightgray;
    border-radius: 10px;
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
    height : 48px;
    border-radius: 10px;
    border-style: solid;
    border-color: lightgrey;
    outline : none;
`;

const MemberTitle = styled.div`
    display: flex;
    align-items: center;
    width: 40vw;
    font-size: 1.2rem;
    font-weight: bold;
`
const AddMemberButton = styled.div`
    align-items: center;
    font-size: 13px;
`
const AddMemberIcon = styled(MdOutlineAddCircle)`
    width : 1.4rem;
    height : 1.4rem;
    margin-left : 10px;
`
const MemberWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 40vw;
    font-size: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
`
const MemeberContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #FFFCB1;
    padding: 5px;
    border-radius: 10px;
`


const Member = styled.span`
    color : black;
    font-size: 15px;
    font-weight: 500;
    margin-left: 5px;
    margin-right: 5px;
`
const WarningIcon = styled(AiFillWarning)`

`
const WarningTitle = styled.div`
    display: flex;
    align-items: center;
    width : 40vw;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`
const Warning = styled.div`
    display: flex;
    flex-direction:column;
    background-color: #F2F2F2;
    width : 40vw;
    font-size: 14px;
    padding : 1rem;
    border-radius: 10px;
    
`
const WarningMsg = styled.span`
    margin-top : 0.3rem;
    margin-bottom : 0.3rem;
    font-size: 0.9rem;
    font-weight: 500;
`

const ReservationButton = styled.button`
    background-color: #a31432;
    width : 35vw;
    height : 50px;
    color : white;
    font-size: large;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
    margin-bottom: 1rem;
    margin-top : 1rem;
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
    display: flex;
    flex-direction: column;
    align-items: center;
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
    width : 100%;
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
const AddMemberInputContainer = styled.div`
    margin-top: 30px;
`
const AddMemberInput = styled.input`
  ::placeholder{
        color: gray
    }
    font-weight:500;
    font-size: 1rem;
    padding-left: 0.5rem;
    width : 20vw;
    height : 48px;
    border-style: solid;
    border-color: lightgrey;
    align-items: center;
    outline : none;
`;
const TimeLineWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 12px;
`
const TimeLineBlock = styled.div`
    font-size: 0.6rem;
    font-weight: bold;
    color : white;
    width : 2.2rem;
    height : 2.2rem;
    background-color: ${(props) => props.color};
    display: flex;
    align-items: center;
    text-align: center;
    border-radius: 7px;
    margin : 1px;
`
const ModalAddMemeberBtn = styled.button`
    background-color: #a31432;
    margin-left: 3px;
    width : 5vw;
    height : 48px;
    color : white;
    font-size: 1rem;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
    border-radius: 8px;
    border-radius: 10px;
    border: none;
    :hover{
        background-color: #EF9090;
    }
`;
function ReservingPage() {
    const TimeList = [
        "9:00",
        "9:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
    ]
    const TimeLineList = [
        "9:00-9:30",
        "9:30-10:00",
        "10:00-10:30",
        "10:30-11:00",
        "11:00-11:30",
        "11:30-12:00",
        "12:00-12:30",
        "12:30-13:00",
        "13:00-13:30",
        "13:30-14:00",
        "14:00-14:30",
        "14:30-15:00",
        "15:00-15:30",
        "15:30-16:00",
        "16:00-16:30",
        "16:30-17:00",
    ]


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alreadyReservedTime = useSelector(state => state.reservation.reservedTime);
    const [isStartTimeBtnClicked, setIsStartTimeBtnClicked] = useState(false);
    const [isEndTimeBtnClicked, setIsEndTimeBtnClicked] = useState(false);

    const [isAddMemeberClicked, setIsAddMemeberClicked] = useState(false);
    const [startTime, setStartTime] = useState("회의시작 시간");
    const [endTime, setEndTime] = useState("회의끝나는 시간");
    const [userNo, setUserNo] = useState('');
    const [meetingName, setMeetingName] = useState("");
    const selectedDate = useSelector(state => state.dateReducer.date);
    const selectedRoom = useSelector(state => state.roomReducer.room);
    const memberList = useSelector(state => state.userInfo.memList);
    const memIdList = useSelector(state => state.userInfo.memIdList);
    const myId = useSelector(state => state.userInfo.myInfo.id);
    const divideTime = useSelector(state => state.reservation.divideTime);
    const [selectedTimeBlock, setSelectedTimeBlock] = useState([]);


    const checkReservedTime = (startTime, endTime) => {
        let reservedStartHour;
        let reservedStartMinute;
        let reservedEndHour;
        let reservedEndMinute;
        let startHour = parseInt(startTime.split(':')[0]);
        let startMinute = parseInt(startTime.split(':')[1]);
        let endHour = parseInt(endTime.split(':')[0]);
        let endMinute = parseInt(endTime.split(':')[1]);
        let start;
        let end;
        console.log('예약된 시간');
        console.log(alreadyReservedTime);
        for (let i = 0; i < alreadyReservedTime.length; i++) {
            console.log(alreadyReservedTime[i]);
            start = alreadyReservedTime[i].split('-')[0];
            end = alreadyReservedTime[i].split('-')[1];

            reservedStartHour = parseInt(start.split(':')[0]);
            reservedStartMinute = parseInt(start.split(':')[1]);
            reservedEndHour = parseInt(end.split(':')[0]);
            reservedEndMinute = parseInt(end.split(':')[1]);

            if (endHour <= reservedStartHour) {
                if (endHour === reservedStartHour && endMinute > reservedStartMinute) {
                    return false;
                }
            } else if (endHour > reservedStartHour && endHour < reservedEndHour) {
                return false;
            }
            else {
                if (startHour < reservedEndHour) {
                    return false;
                }
                if (startHour === reservedEndHour && startMinute < reservedEndMinute) {
                    console.log(startTime);
                    console.log(startMinute);
                    console.log(reservedEndMinute);
                    return false;
                }
            }

        }
        return true;

    }

    const setSelectedTimeLine = (startTime, endTime) => {
        let startHour = parseInt(startTime.split(':')[0]);
        let startMinute = parseInt(startTime.split(':')[1]);
        let endHour = parseInt(endTime.split(':')[0]);
        let endMinute = parseInt(endTime.split(':')[1]);
        let time = [];
        console.log(startTime, endTime);
        for (let i = startHour; i <= endHour; i++) {
            if (i === endHour) {
                if (endMinute === 30) {

                    time.push(`${endHour}:00-${endHour}:30`)
                    break;
                } else {
                    break;
                }    //예약있는 날짜의 endtime이랑 예약하려는 날짜의 start time이랑 겹치면 색깔 안변함

            }
            if (i === startHour) {
                if (startMinute === 30) {
                    console.log(`${startHour}:30-${startHour + 1}:00`);
                    time.push(`${startHour}:30-${startHour + 1}:00`);
                    continue;
                }
                if (startMinute === 0 && endHour > i) {

                    time.push(`${startHour}:00-${startHour}:30`);
                    time.push(`${startHour}:30-${startHour + 1}:00`);
                    continue;
                } if (startMinute === 0 && endHour === i) {
                    time.push(`${startHour}:00-${startHour + 1}:30`);
                    continue;
                }


            }
            if (i < endHour && i > startHour) {
                time.push(`${i}:00-${i}:30`)
                time.push(`${i}:30-${i + 1}:00`)
            }
        }

        console.log(time);
        setSelectedTimeBlock(time);
    }
    const clickStartTimePickBtn = (time) => {
        let startHour;
        let startMinute;
        let endHour;
        let endMinute;
        let gap;
        if (endTime !== "회의끝나는 시간") {
            startHour = parseInt(time.split(':')[0]);
            startMinute = parseInt(time.split(':')[1]);
            endHour = parseInt(endTime.split(':')[0]);
            endMinute = parseInt(endTime.split(':')[1]);

            gap = (endHour - startHour) * 60 + (endMinute - startMinute);
            console.log(gap);
            if (gap <= 0) {

                alert('회의 시작시간을 확인해주세요');
                return;
            }

            if (gap <= 120) {
                setStartTime(time);
                setIsStartTimeBtnClicked(!isStartTimeBtnClicked);
                if (!checkReservedTime(time, endTime)) {
                    alert('예약자가 존재합니다.');
                    setSelectedTimeBlock([]);
                    setStartTime('회의시작 시간');
                    setEndTime('회의끝나는 시간');
                    return;
                }
                setSelectedTimeLine(time, endTime);
            } else {
                alert('최대 2시간만 예약 가능합니다.');
                return;
            }
            setStartTime(time);
        }



        setIsStartTimeBtnClicked(!isStartTimeBtnClicked);
        setStartTime(time);
        setSelectedTimeLine(time, endTime);

    }



    const clickEndTimePickBtn = (time) => {
        let startHour;
        let startMinute;
        let endHour;
        let endMinute;
        let gap;

        console.log(time);
        if (startTime !== "회의시작 시간") {
            startHour = parseInt(startTime.split(':')[0]);
            startMinute = parseInt(startTime.split(':')[1]);
            endHour = parseInt(time.split(':')[0]);
            endMinute = parseInt(time.split(':')[1]);
            console.log(startHour);
            console.log(startMinute);
            console.log(endHour);
            console.log(endMinute);
            gap = (endHour - startHour) * 60 + (endMinute - startMinute);
            console.log(gap);
            if (gap <= 0) {

                alert('회의 종료시간을 확인해주세요');
                return;
            }

            if (gap <= 120) {
                setEndTime(time);
                setIsEndTimeBtnClicked(!isEndTimeBtnClicked);
                if (!checkReservedTime(startTime, time)) {
                    console.log()
                    alert('예약자가 존재합니다.')

                    setStartTime('회의시작 시간');
                    setEndTime('회의끝나는 시간');
                    setSelectedTimeBlock([]);
                    return;
                }
                setSelectedTimeLine(startTime, time);
            } else {
                alert('최대 2시간만 예약 가능합니다.')
                return;
            }
            setEndTime(time);
        }


        setIsEndTimeBtnClicked(!isEndTimeBtnClicked);
        setEndTime(time);

        setSelectedTimeLine(startTime, time);

    }

    const onChangeMeetingName = (e) => {
        setMeetingName(e.target.value);
        console.log(e.target.value);
    }

    const onClickAddUserBtn = (userNo) => {

        dispatch(getUserNo(userNo, memberList, memIdList));
        console.log(divideTime);
    }

    const onClickRemoveMemeber = (userNo) => {
        dispatch(removeMember(userNo, memberList, memIdList));
    }

    const onClickReserveBtn = async () => {
        let reserveData;
        reserveData = {
            is_scheduled: false,
            day: [],
            date: `${format(selectedDate, 'yyyy')}-${format(selectedDate, 'MM')}-${format(selectedDate, 'dd')}`,
            start: startTime,
            end: endTime,
            reason: meetingName,
            status: 0,
            booker: myId,
            room: selectedRoom.id,
            companion: memIdList, //연동필요!!
        };

        if (startTime === "회의시작 시간") {
            alert('회의시작 시간을 설정하세요');
            return;
        } if (endTime === "회의끝나는 시간") {
            alert('회의끝나는 시간을 설정하세요');
        }
        await dispatch(makeReservation(reserveData));
        navigate('/main')
    }

    const getTimeLineColor = (time) => {
        if (divideTime.includes(time)) {
            return '#FF5A5A'
        } else if (selectedTimeBlock.includes(time)) {
            return '#2B41B4'
        } else {
            return '#45D700'
        }
    }


    useEffect(() => {
        dispatch(getRoomReservation(selectedRoom.id, [], `${format(selectedDate, 'yyyy')}-${format(selectedDate, 'MM')}-${format(selectedDate, 'dd')}`));

    }, [dispatch, selectedDate, selectedRoom]);
    return (
        <div>
            <Header></Header>
            <ReserveWrapper>
                <RoomImage src={selectedRoom.images.image ?? ''}></RoomImage>
                <PartOne>

                    <RoomTitle>{selectedRoom.name}</RoomTitle>
                    <ToolWrapper>
                        {
                            <Tool>
                                <ToolImageBorder>
                                    <ToolImage src={projector}></ToolImage>
                                </ToolImageBorder>
                                <ToolTitle>{selectedRoom.amenities}</ToolTitle>
                            </Tool>
                        }
                    </ToolWrapper>
                </PartOne>
                <PartTwo>
                    <DatePickWrapper>
                        <DatePickButton>
                            {format(selectedDate, 'yyyy')}년 {format(selectedDate, 'M')}월 {format(selectedDate, 'dd')}일</DatePickButton>
                    </DatePickWrapper>

                    <TimeLineWrapper>
                        {
                            TimeLineList.map((time) => (<TimeLineBlock color={getTimeLineColor(time)}>{time}</TimeLineBlock>))
                        }
                    </TimeLineWrapper>
                    <TimePickbtn><TimeTitle onClick={() => setIsStartTimeBtnClicked(!isStartTimeBtnClicked)}>{startTime}</TimeTitle>{
                        isStartTimeBtnClicked === true ? TimeList.map((time) => (<TimeTitle onClick={() => clickStartTimePickBtn(time)}>{time}</TimeTitle>)) : null
                    }</TimePickbtn>
                    <TimePickbtn><TimeTitle onClick={() => setIsEndTimeBtnClicked(!isEndTimeBtnClicked)}>{endTime}</TimeTitle>{
                        isEndTimeBtnClicked === true ? TimeList.map((time) => (<TimeTitle onClick={() => clickEndTimePickBtn(time)}>{time}</TimeTitle>)) : null
                    }</TimePickbtn>
                    <MeetingNameInput placeholder="회의명을 입력하세요(선택)" onChange={onChangeMeetingName}></MeetingNameInput>
                </PartTwo>
                <PartThree>
                    <MemberTitle>참석멤버</MemberTitle>
                    {isAddMemeberClicked === true ?
                        <Background>
                            <ModalContainer>
                                <ModalHeader>
                                    <ModalMainTitle>참석멤버 추가</ModalMainTitle>
                                    <ModalXBtn color="white" onClick={() => setIsAddMemeberClicked(!isAddMemeberClicked)}></ModalXBtn>
                                </ModalHeader>
                                <AddMemberInputContainer>
                                    <AddMemberInput placeholder="추가할 멤버 학번" onChange={(e) => { setUserNo(e.target.value) }}></AddMemberInput>
                                    <ModalAddMemeberBtn onClick={() => onClickAddUserBtn(userNo)}>추가</ModalAddMemeberBtn>
                                </AddMemberInputContainer>

                            </ModalContainer>
                        </Background> : null}

                    <MemberWrapper>    {

                        memberList.map((member) => (<MemeberContainer><ModalXBtn onClick={() => onClickRemoveMemeber(member)}></ModalXBtn><Member>{member}</Member></MemeberContainer>))
                    }
                        <AddMemberButton onClick={() => setIsAddMemeberClicked(!isAddMemeberClicked)}>
                            <AddMemberIcon></AddMemberIcon>
                        </AddMemberButton>
                    </MemberWrapper>
                </PartThree>



                <PartFour>
                    <WarningTitle><WarningIcon></WarningIcon>유의사항</WarningTitle>
                    <Warning>
                        {selectedRoom.discription}
                    </Warning></PartFour>

                <ReservationButton onClick={onClickReserveBtn} >예약하기</ReservationButton>
            </ReserveWrapper>
        </div>
    );
}

export default ReservingPage;