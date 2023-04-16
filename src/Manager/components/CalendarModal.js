import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

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

const CalendarModal = ({ visible, onSelect }) => {
  const [value, setValue] = useState(new Date());
  if (!visible) return null;
  return (
    <Fullscreen onClick={onSelect}>
      <Calendar onChange={setValue} value={value} />
    </Fullscreen>
  );
};

export default CalendarModal;
