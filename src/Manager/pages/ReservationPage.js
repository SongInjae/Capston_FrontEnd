import { useState } from 'react';
import styled from 'styled-components';

import sea_img from '../assets/img/search.png';
import cal_img from '../assets/img/data-table.png';
import ReservationTable from './Reserve/ReservationTable';
import CalendarModal from '../components/CalendarModal';

const FliterAddBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 6rem;
`;
const ContentBlock = styled.div`
  flex: 1;
`;

const NameFliterBlock = styled.div`
  border: 1px solid #e1e3e5;
  border-radius: 4px;
  width: 20rem;
  height: 2rem;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`;
const CalendarImage = styled.div`
  background-image: url(${cal_img});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 2.5rem;
  height: 2rem;
  margin-left: 1rem;
  display: flex;
  justify-content: center;
`;
const LabelBlock = styled.label`
  width: 4rem;
  height: 100%;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 2px solid #e1e3e5;
`;
const NameSearchBlock = styled.div`
  width: 16rem;
  display: flex;
  align-items: center;
`;
const SearchImage = styled.div`
  background-image: url(${sea_img});
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 0.5rem;
  width: 0.8rem;
  height: 0.8rem;
`;
const SearchBlock = styled.input`
  outline: none;
  width: 16rem;
  height: 100%;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin-left: 0.5rem;
`;

const ReservationPage = () => {
  const [modal, setModal] = useState(false);
  const onCalendar = () => {
    setModal(true);
  };
  const onSelect = () => {
    setModal(false);
  };
  return (
    <>
      <FliterAddBlock>
        <CalendarImage onClick={onCalendar} />
        <CalendarModal visible={modal} onSelect={onSelect} />
        <NameFliterBlock>
          <LabelBlock htmlFor="name">Name</LabelBlock>
          <NameSearchBlock>
            <SearchImage />
            <SearchBlock placeholder="Search" id="name" />
          </NameSearchBlock>
        </NameFliterBlock>
      </FliterAddBlock>
      <ContentBlock>
        <ReservationTable />
      </ContentBlock>
    </>
  );
};

export default ReservationPage;
