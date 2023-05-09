import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { insert } from '../store/modules/addmember';
import Paging from '../components/Paging';
import sea_img from '../assets/img/search.png';
import UserTable from './Member/UserTable';

import {
  read,
  utils,
} from 'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs';

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

const ButtonsBlock = styled.div`
  position: absolute;
  height: 2rem;
  width: 12rem;
  right: 1rem;
  display: flex;
  text-align: center;
`;
const FileBlock = styled(Link)`
  line-height: 1.5rem;
  box-sizing: border-box;
  font-family: 'InterLight';
  font-size: 0.9rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  width: 6rem;
  height: 2rem;
  text-decoration: none;
  border-radius: 0.25rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  cursor: pointer;
  background-color: rgb(195, 0, 47);
  &:hover {
    background: rgba(105, 0, 47, 0.1);
  }
`;
const LabelCsvBlock = styled.label`
  line-height: 1.5rem;
  box-sizing: border-box;
  font-family: 'InterLight';
  font-size: 0.9rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  width: 6rem;
  height: 2rem;
  text-decoration: none;
  border-radius: 0.25rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  cursor: pointer;
  background-color: rgb(195, 0, 47);
  &:hover {
    background: rgba(105, 0, 47, 0.1);
  }
`;

const CsvBlock = styled.input`
  display: none;
`;

const MemberManagementsPage = () => {
  const infos = useSelector(({ addmembers }) => addmembers.info); //info 불러오기
  const [userInput, setUserInput] = useState(''); //필터링 input
  const dispatch = useDispatch(); //redux dispatch 불러오기

  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); //마지막 포스트의 index
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); //첫번째 포스트의 index
  const [currentPosts, setCurrentPosts] = useState(0); //현재 포스트

  //필터링 input 변화 감지
  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  //필터링 된 이름 내보내기
  const filterInfo = useCallback(
    infos.filter((info) => {
      return info.number.includes(userInput);
    }),
    [userInput, infos],
  );

  // 파일 읽기
  const onChangeFile = (e) => {
    let input = e.target;
    let reader = new FileReader();
    let designation = null;
    let name = null;
    let number = null;
    let email = null;
    let pwd = 3;

    reader.onload = function () {
      let data = reader.result;
      let workBook = read(data, { type: 'binary' });

      workBook.SheetNames.forEach(function (sheetName) {
        let rows = utils.sheet_to_json(workBook.Sheets[sheetName]);
        for (let i = 0; i < rows.length; i++) {
          designation = rows[i].designation;
          name = rows[i].name;
          number = rows[i].number.toString();
          email = rows[i].email;
          dispatch(insert({ designation, name, number, email, pwd }));
        }
      });
    };
    reader.readAsBinaryString(input.files[0]);
  };

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
        <NameFliterBlock>
          <LabelBlock htmlFor="name">학번</LabelBlock>
          <NameSearchBlock>
            <SearchImage />
            <SearchBlock placeholder="Search" id="name" onChange={onChange} />
          </NameSearchBlock>
        </NameFliterBlock>
        <ButtonsBlock>
          <FileBlock to="/admin/member/add">Add</FileBlock>
          <LabelCsvBlock htmlFor="memberCsv">CSV</LabelCsvBlock>
          <CsvBlock
            type="file"
            id="memberCsv"
            accept=".xlsx"
            onChange={onChangeFile}
          />
        </ButtonsBlock>
      </FliterAddBlock>
      <ContentBlock>
        <UserTable infos={currentPosts} />
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

export default MemberManagementsPage;
