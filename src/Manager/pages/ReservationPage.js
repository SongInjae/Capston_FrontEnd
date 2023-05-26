import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

import { take } from '../store/modules/reserve';
import sea_img from '../assets/img/search.png';
import cal_img from '../assets/img/data-table.png';
import ReservationTable from './Reserve/ReservationTable';
import CalendarModals from '../components/CalendarModals';
import Pagenation from '../components/Pagenation';

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(take());
  }, []);

  const [modal, setModal] = useState(false); //팝업창 여부

  const [date, setDate] = useState(null);

  const infos = useSelector(({ reserve }) => reserve.infos); //info 불러오기
  const [userInput, setUserInput] = useState(''); //필터링 input
  const [filterInfo, setFilterInfo] = useState(infos);
  //필터링 input 변화 감지
  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  const [page, setPage] = useState(1);
  const offset = (page - 1) * 12;

  //이름 필터링
  useEffect(() => {
    setFilterInfo(
      infos
        .filter((info) => {
          return info.booker.name.includes(userInput);
        })
        .slice(offset, offset + 12),
    );
  }, [userInput, infos, offset]);

  //달력 이모티콘 클릭하면 팝업창 띄우기
  const onCalendar = () => {
    setModal(true);
  };
  //날짜 선택하면 팝업 끄고 값 받아오기
  const onSelect = (e) => {
    setModal(false);
    setDate(format(e, 'yyyy-MM-dd'));
  };
  //달력 필터링
  useEffect(() => {
    setFilterInfo(
      filterInfo.filter((info) => {
        return date === null ? filterInfo : info.date === date ? info : '';
      }),
    );
  }, [date]);

  return (
    <>
      <FliterAddBlock>
        <CalendarImage onClick={onCalendar} />
        <CalendarModals visible={modal} onSelect={onSelect} />
        <NameFliterBlock>
          <LabelBlock htmlFor="name">Name</LabelBlock>
          <NameSearchBlock>
            <SearchImage />
            <SearchBlock placeholder="Search" id="name" onChange={onChange} />
          </NameSearchBlock>
        </NameFliterBlock>
      </FliterAddBlock>
      <ContentBlock>
        <ReservationTable infos={filterInfo} />
      </ContentBlock>
      <Pagenation
        total={infos.length}
        limit={12}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default ReservationPage;
