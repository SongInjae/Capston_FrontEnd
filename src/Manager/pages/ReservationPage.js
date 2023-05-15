import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

import Paging from '../components/Paging';
import sea_img from '../assets/img/search.png';
import cal_img from '../assets/img/data-table.png';
import ReservationTable from './Reserve/ReservationTable';
import CalendarModals from '../components/CalendarModals';

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
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); //마지막 포스트의 index
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); //첫번째 포스트의 index
  const [currentPosts, setCurrentPosts] = useState(0); //현재 포스트

  const [modal, setModal] = useState(false); //팝업창 여부

  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);

  const infos = useSelector(({ reserve }) => reserve.infos); //info 불러오기
  const [userInput, setUserInput] = useState(''); //필터링 input
  const [filterInfo, setFilterInfo] = useState(infos);
  //필터링 input 변화 감지
  const onChange = (e) => {
    setUserInput(e.target.value);
  };
  //이름 필터링
  useEffect(() => {
    setFilterInfo(
      infos.filter((info) => {
        return info.name.includes(userInput);
      }),
    );
  }, [userInput, infos]);

  //달력 이모티콘 클릭하면 팝업창 띄우기
  const onCalendar = () => {
    setModal(true);
  };
  //날짜 선택하면 팝업 끄고 값 받아오기
  const onSelect = (e) => {
    setModal(false);
    setYear(parseInt(format(e, 'yyyy')));
    setMonth(parseInt(format(e, 'MM')));
    setDay(parseInt(format(e, 'd')));
  };
  //달력 필터링
  useEffect(() => {
    setFilterInfo(
      filterInfo.filter((info) => {
        return year === null
          ? filterInfo
          : info.date_year === year &&
            info.date_month === month &&
            info.date_day === day
          ? info
          : '';
      }),
    );
  }, [year, month, day]);

  //페이지네이션
  useEffect(() => {
    setCount(filterInfo.length);
    setIndexOfLastPost(currentPage * 12);
    setIndexOfFirstPost(indexOfLastPost - 12);
    setCurrentPosts(filterInfo.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, indexOfFirstPost, indexOfLastPost, filterInfo]);

  const setPage = (e) => {
    setCurrentPage(e);
  };

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
        <ReservationTable infos={currentPosts} />
      </ContentBlock>
      <Paging
        page={currentPage}
        maxcntItem={12}
        count={count}
        setPage={setPage}
      />
    </>
  );
};

export default ReservationPage;
