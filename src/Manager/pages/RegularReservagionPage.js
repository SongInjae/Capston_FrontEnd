import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { take } from '../store/modules/regular';
import sea_img from '../assets/img/search.png';
import RegularUserTable from './Regular/RegularUserTable';
import Pagenation from '../components/Pagenation';
import Loading from '../components/Loading';

const FliterBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 6rem;
  border-bottom: 0.1rem solid #f7f9fc;
`;
const NameFliterBlock = styled.div`
  border: 2px solid #f7f9fc;
  border-radius: 0.25rem;
  width: 20rem;
  height: 2rem;
  margin-left: 2rem;
  display: flex;
  align-items: center;
`;
const LabelBlock = styled.label`
  width: 4rem;
  height: 100%;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 2px solid #f7f9fc;
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
  color: red;
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

const ContentBlock = styled.div`
  flex: 1;
`;

const RegularReservagionPage = () => {
  const dispatch = useDispatch();
  const { loading_take, loading_remove } = useSelector(({ loading }) => ({
    loading_take: loading['regular/take'],
    loading_remove: loading['regular/REMOVE'],
  }));
  useEffect(() => {
    dispatch(take());
  }, [dispatch, loading_remove]);
  const infos = useSelector(({ regular }) => regular.regularInfo); //info 불러오기
  const [filterInfo, setFilterInfo] = useState(infos);
  const [userInput, setUserInput] = useState(''); //필터링 input
  //필터링 input 변화 감지
  const onChange = (e) => {
    setUserInput(e.target.value);
  };
  //페이지네이션
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

  if (loading_take || loading_remove) {
    return <Loading />;
  }

  return (
    <>
      <FliterBlock>
        <NameFliterBlock>
          <LabelBlock htmlFor="name">Name</LabelBlock>
          <NameSearchBlock>
            <SearchImage />
            <SearchBlock placeholder="Search" id="name" onChange={onChange} />
          </NameSearchBlock>
        </NameFliterBlock>
      </FliterBlock>
      <ContentBlock>
        <RegularUserTable infos={filterInfo} />
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

export default RegularReservagionPage;
