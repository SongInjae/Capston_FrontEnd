import { useState } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  startOfWeek,
} from 'date-fns';
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

const DayCellsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Day = styled.div`
  margin: 2px;
  width: 8.4rem;
  height: 90px;
  border-radius: 6px;
  padding-left: 0.5rem;
  padding-top: 0.3rem;
  border-style: solid;
  border-color: ${(props) => props.color};
`;
const ReserveTimeBlock = styled.div`
  width: 100%;
  height: 25%;
  display: block;
  color: white;
  
  ${(props) =>
    props.reser &&
    css`
      background: rgba(195, 0, 47, 0.5);
    `}
`;

const HoliDay = styled(Day)`
  color: red;
`;
const OtherMonthDay = styled(Day)`
  color: #bfbfbf;
`;

const WeekWrapper = styled.div`
  display: flex;
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

function Bodys({ infos, currentMonth, selectedDate, onDateClick }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneday = day;
      let reserveTime = '';
      let reser = false;

      infos && infos.forEach((info) => {
        if (
          new Date(info.date).getMonth() === cloneday.getMonth() &&
          new Date(info.date).getDate() === cloneday.getDate()
        ) {
          reserveTime = moment(info.start).format('HH:mm') + '-' + moment(info.end).format('HH:mm');
          reser = true;
        }

      });
      // infos.forEach((info) => {
      //   if (
      //     new Date(info.date).getMonth() === cloneday.getMonth() + 1 &&
      //     new Date(info.date).getDate() === cloneday.getDate()
      //   ) {
      //     reserveTime = info.start + info.end;
      //     reser = true;
      //   }

      // });

      // infos.forEach((info) => {
      //   if (
      //     info.month === cloneday.getMonth() + 1 &&
      //     info.day === cloneday.getDate()
      //   ) {
      //     reserveTime = info.start + info.end;
      //     reser = true;
      //   }

      // });
      // infos.forEach((info) => {
      //   if (
      //     info.month === cloneday.getMonth() + 1 &&
      //     info.day === cloneday.getDate()
      //   ) {
      //     reserveTime = info.start + info.end;
      //     reser = true;
      //   }

      // });


      if (day.getDay() === 0 || day.getDay() === 6) {
        if (!isSameMonth(currentMonth, day)) {
          days.push(
            <OtherMonthDay
              color={isSameDay(selectedDate, cloneday) ? 'red' : 'white'}
              onClick={() => {
                onDateClick(cloneday);
              }}
            >
              {formattedDate}
              <ReserveTimeBlock reser={reser}>{reserveTime}</ReserveTimeBlock>
            </OtherMonthDay>,
          );
        } else {
          days.push(
            <HoliDay
              color={isSameDay(selectedDate, cloneday) ? 'red' : 'white'}
              onClick={() => {
                onDateClick(cloneday);
              }}
            >
              {formattedDate}
              <ReserveTimeBlock reser={reser}>{reserveTime}</ReserveTimeBlock>
            </HoliDay>,
          );
        }
      } else {
        if (!isSameMonth(currentMonth, day)) {
          days.push(
            <OtherMonthDay
              color={isSameDay(selectedDate, cloneday) ? 'red' : 'white'}
              onClick={() => {
                onDateClick(cloneday);
              }}
            >
              {formattedDate}
              <ReserveTimeBlock reser={reser}>{reserveTime}</ReserveTimeBlock>
            </OtherMonthDay>,
          );
        } else {
          days.push(
            <Day
              color={isSameDay(selectedDate, cloneday) ? 'red' : 'white'}
              onClick={() => {
                onDateClick(cloneday);
              }}
            >
              {formattedDate}
              <ReserveTimeBlock reser={reser}>{reserveTime}</ReserveTimeBlock>
            </Day>,
          );
        }
      }
      day = addDays(day, 1);
    }
    rows.push(<WeekWrapper>{days}</WeekWrapper>);
    days = [];
  }
  return <DayCellsWrapper>{rows}</DayCellsWrapper>;
}

const MyReserveCalendar = ({ infos }) => {
  const [current, setCurrent] = useState(new Date());
  const [selectDate, setSelectedDate] = useState(new Date());

  const onClickMonthMove = (direction) => {
    if (direction === 'left') {
      setCurrent(subMonths(current, 1));
    } else {
      setCurrent(addMonths(current, 1));
    }
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
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
      <Bodys
        currentMonth={current}
        selectedDate={selectDate}
        onDateClick={onDateClick}
        infos={infos}
      ></Bodys>
    </CalendarWrapper>
  );
};

export default MyReserveCalendar;
