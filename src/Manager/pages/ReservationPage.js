import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Paging from '../components/Paging';
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
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); //마지막 포스트의 index
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); //첫번째 포스트의 index
  const [currentPosts, setCurrentPosts] = useState(0); //현재 포스트

  const [modal, setModal] = useState(false);
  const onCalendar = () => {
    setModal(true);
  };
  const onSelect = (e) => {
    setModal(false);
    console.log(e);
  };

  const infos = useSelector(({ reserve }) => reserve.infos); //info 불러오기
  const [userInput, setUserInput] = useState(''); //필터링 input

  //필터링 input 변화 감지
  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  //필터링 된 이름 내보내기
  const filterInfo = useCallback(
    infos.filter((info) => {
      return info.name.includes(userInput);
    }),
    [userInput, infos],
  );

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
        <CalendarModal visible={modal} onSelect={onSelect} />
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
