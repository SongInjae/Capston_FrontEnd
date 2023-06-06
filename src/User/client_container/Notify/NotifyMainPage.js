import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { take } from '../../store/modules/board';
import sea_img from '../../../Manager/assets/img/search.png';
import Pagenation from '../../../Manager/components/Pagenation';
import Header from '../../component/header';
//헤더

//본문
const ContentBlock = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const ContentTitle = styled.div`
  margin-top: 2rem;
  //border-left: 0.25rem solid rgb(195, 0, 47);
  //padding-left: 0.25rem;
  //font-weight: 700;

  text-align: center;
  font-weight: 700;
  font-size: 2rem;
`;

const TitleFliterBlock = styled.div`
  border: 1px solid #e1e3e5;
  border-radius: 4px;
  width: 20rem;
  height: 2rem;
  display: flex;
  align-items: center;
  float: right;
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
const TitleSearchBlock = styled.div`
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

const TableBlock = styled.table`
  width: 100%;
  margin-top: 3rem;
  text-align: center;
  border-spacing: 0;
  font-family: 'InterLight';
`;
const TheadBlock = styled.thead`
  width: 100%;
  height: 2rem;
  color: white;
  background-color: #51626f;
`;
const TheadTd1 = styled.td`
  width: 5%;
  border-right: 0.1px solid white;
`;
const TheadTd2 = styled.td`
  width: 65%;
  border-right: 0.1px solid white;
`;
const TheadTd3 = styled.td`
  width: 20%;
  border-right: 0.1px solid white;
`;
const TheadTd4 = styled.td`
  width: 10%;
  border-right: 0.1px solid white;
`;
const TrBlock = styled.tr`
  height: 2.5rem;
  &:hover {
    background: #eceaea;
  }
`;
const Td1 = styled.td`
  width: 5%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td2 = styled.td`
  width: 65%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
  text-align: start;
  padding-left: 1rem;
  text-overflow: ellipsis;
`;
const Td3 = styled.td`
  width: 20%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td4 = styled.td`
  width: 10%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: black;
`;

const NotifyMainPage = () => {
  const dispatch = useDispatch();
  const infos = useSelector(({ board }) => board.infos);
  const [userInput, setUserInput] = useState('');
  const [filterInfo, setFilterInfo] = useState(infos);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 12;

  useEffect(() => {
    dispatch(take());
  }, [dispatch]);

  useEffect(() => {
    setFilterInfo(
      infos
        .filter((info) => {
          return info.title.includes(userInput);
        })
        .slice(offset, offset + 12),
    );
  }, [userInput, infos, offset]);

  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  const infoList = filterInfo.map((info, idx) => (
    <TrBlock key={info.id}>
      <Td1>{idx + 1}.</Td1>
      <Td2>{info.title}</Td2>
      <Td3>{info.end.replace('T', ' ').substring(0, 10)}</Td3>
      <Td4>
        <LinkStyled to={`/main/board/${info.id}`}>&rarr;</LinkStyled>
      </Td4>
    </TrBlock>
  ));

  const onePageInfo = infoList.slice(offset, offset + 12);

  return (
    <div>
      <Header></Header>

      <ContentBlock>
        <ContentTitle>공지사항</ContentTitle>
        <TitleFliterBlock>
          <LabelBlock htmlFor="name">Title</LabelBlock>
          <TitleSearchBlock>
            <SearchImage />
            <SearchBlock placeholder="Search" id="name" onChange={onChange} />
          </TitleSearchBlock>
        </TitleFliterBlock>
        <TableBlock>
          <TheadBlock>
            <tr>
              <TheadTd1>번호</TheadTd1>
              <TheadTd2>제목</TheadTd2>
              <TheadTd3>작성일</TheadTd3>
              <TheadTd4 />
            </tr>
          </TheadBlock>
          <tbody>{onePageInfo}</tbody>
        </TableBlock>
      </ContentBlock>
      <Pagenation
        noflex={true}
        total={infos.length}
        limit={12}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default NotifyMainPage;
