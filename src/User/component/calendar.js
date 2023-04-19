import React, { useState } from 'react';
import styled from 'styled-components';
import { format, addMonths, subMonths } from 'date-fns';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const MonthText = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;
const MoveRight = styled(BsFillCaretRightFill)`
  font-size: 1.1rem;
  margin-left: 10px;
`;
const MoveLeft = styled(BsFillCaretLeftFill)`
  font-size: 1.1rem;
  margin-right: 10px;
`;
const DaysWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Days = styled.div`
  justify-content: center;
  font-size: 0.8rem;
  width: 8.4rem;
  border-radius: 6px;
  background-color: #ffe9e9;
  margin: 2px;
  padding-left: 0.5rem;
  padding-top: 3px;
  padding-bottom: 3px;
`;

function DaysComponent() {
  const dayList = ['Sun', 'Mon', 'Tue', 'Wen', 'Thrs', 'Fri', 'Sat'];
  return (
    <DaysWrapper>
      {dayList.map((day) => (
        <Days>{day}</Days>
      ))}
    </DaysWrapper>
  );
}

function UserCalendar() {
  const [current, setCurrent] = useState(new Date());
  const [selectDate, setSelectDate] = useState(new Date());

  const onClickMonthMove = (direction) => {
    if (direction === 'left') {
      setCurrent(subMonths(current, 1));
    } else {
      setCurrent(addMonths(current, 1));
    }
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <MoveLeft
          onClick={() => {
            onClickMonthMove('left');
          }}
        ></MoveLeft>
        <MonthText>
          {format(current, 'yyyy')}.{format(current, 'M')}
        </MonthText>
        <MoveRight
          onClick={() => {
            onClickMonthMove('right');
          }}
        ></MoveRight>
      </CalendarHeader>
      <DaysComponent></DaysComponent>
    </CalendarWrapper>
  );
}

export default UserCalendar;
