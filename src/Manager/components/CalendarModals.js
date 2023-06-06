import { useState } from 'react';
import styled from 'styled-components';
import {
  format,
  addMonths,
  addDays,
  subMonths,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

const Fullscreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.5rem;
`;
const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`;
const MonthText = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;

const MoveRight = styled(BsFillCaretRightFill)`
  font-size: 0.5rem;
  margin-left: 0.5rem;
`;
const MoveLeft = styled(BsFillCaretLeftFill)`
  font-size: 0.5rem;
  margin-right: 0.5rem;
`;

const DaysWrapper = styled.div`
  display: flex;
  text-align: center;
`;
const Days = styled.div`
  font-size: 0.8rem;
  width: 2.5rem;
  border-radius: 0.5rem;
  background-color: #ffe9e9;
  margin: 0.1rem;
  padding: 0.1rem 0.2rem;
`;

const DayCellsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const Day = styled.div`
  margin: 0.1rem;
  width: 2.5rem;
  height: 2rem;
  border-radius: 0.5rem;
  padding: 0.2rem 0;
  font-size: 0.8rem;
  background-color: ${(props) => props.color};
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

const DaysComponent = () => {
  const dayList = ['Sun', 'Mon', 'Tue', 'Wen', 'Thrs', 'Fri', 'Sat'];
  return (
    <DaysWrapper>
      {dayList.map((day, idx) => (
        <Days key={idx}>{day}</Days>
      ))}
    </DaysWrapper>
  );
};

const DateComponent = ({ current, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(current);
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

      if (day.getDay() === 0 || day.getDay() === 6) {
        //주말인지 체크 여부
        if (!isSameMonth(current, day)) {
          days.push(
            <OtherMonthDay
              color={isSameDay(selectedDate, cloneday) ? 'mistyrose' : 'white'}
              onClick={() => {
                onDateClick(cloneday);
              }}
            >
              {formattedDate}
            </OtherMonthDay>,
          );
        } else {
          days.push(
            <HoliDay
              color={isSameDay(selectedDate, cloneday) ? 'mistyrose' : 'white'}
              onClick={() => {
                onDateClick(cloneday);
              }}
            >
              {formattedDate}
            </HoliDay>,
          );
        }
      } else {
        if (!isSameMonth(current, day)) {
          days.push(
            <OtherMonthDay
              color={isSameDay(selectedDate, cloneday) ? 'mistyrose' : 'white'}
              onClick={() => {
                onDateClick(cloneday);
              }}
            >
              {formattedDate}
            </OtherMonthDay>,
          );
        } else {
          days.push(
            <Day
              color={isSameDay(selectedDate, cloneday) ? 'mistyrose' : 'white'}
              onClick={() => {
                onDateClick(cloneday);
              }}
            >
              {formattedDate}
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
};

const CalendarModals = ({ visible, onSelect }) => {
  const [current, setCurrent] = useState(new Date());
  const [selectDate, setSelectedDate] = useState(new Date());

  if (!visible) return null;
  const onClickMonthMove = (direction) => {
    if (direction === 'left') {
      setCurrent(subMonths(current, 1));
    } else {
      setCurrent(addMonths(current, 1));
    }
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
    onSelect(day);
    visible = false;
  };

  return (
    <Fullscreen>
      <CalendarWrapper>
        <CalendarHeader>
          <MoveLeft onClick={() => onClickMonthMove('left')} />
          <MonthText>
            {format(current, 'yyyy')}.{format(current, 'MM')}
          </MonthText>
          <MoveRight onClick={() => onClickMonthMove('right')} />
        </CalendarHeader>
        <DaysComponent />
        <DateComponent
          current={current}
          selectedDate={selectDate}
          onDateClick={onDateClick}
        />
      </CalendarWrapper>
    </Fullscreen>
  );
};

export default CalendarModals;
