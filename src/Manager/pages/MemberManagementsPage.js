import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { take, excel } from '../store/modules/addmember';
import Pagenation from '../components/Pagenation';
import sea_img from '../assets/img/search.png';
import UserTable from './Member/UserTable';
import Loading from '../components/Loading';

import { CSVLink } from 'react-csv';

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
  //width: 12rem;
  right: 1rem;
  display: flex;
  text-align: center;
`;
const LinkBlock = styled(Link)`
  line-height: 1.5rem;
  box-sizing: border-box;
  font-family: 'InterLight';
  font-size: 0.9rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  width: 5rem;
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
  width: 5rem;
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
const CsvLinkStyled = styled(CSVLink)`
  line-height: 1.5rem;
  box-sizing: border-box;
  font-family: 'InterLight';
  font-size: 0.9rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  width: 5rem;
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
  &[disabled] {
    display: none;
    cursor: revert;
    transform: revert;
  }
`;

const MemberManagementsPage = () => {
  const dispatch = useDispatch(); //redux dispatch 불러오기
  const {
    loading_excel,
    loading_insert,
    loading_take,
    loading_remove,
    loading_change,
    loading_bulkrm,
  } = useSelector(({ loading }) => ({
    loading_excel: loading['addmembers/EXCEL'],
    loading_insert: loading['addmembers/INSERT'],
    loading_take: loading['addmembers/take'],
    loading_remove: loading['addmembers/REMOVE'],
    loading_change: loading['addmembers/CHANGE'],
    loading_bulkrm: loading['addmembers/BULKRM'],
  }));
  useEffect(() => {
    dispatch(take());
  }, [
    dispatch,
    loading_excel,
    loading_remove,
    loading_change,
    loading_insert,
    loading_bulkrm,
  ]);
  const infos = useSelector(({ addmembers }) => addmembers.info); //info 불러오기
  const excelInfo = useSelector(({ addmembers }) => addmembers.excelInfo);
  const [userInput, setUserInput] = useState(''); //필터링 input

  //페이지네이션
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 12;

  //필터링 input 변화 감지
  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  //필터링 된 이름 내보내기
  const filterInfo = useCallback(
    infos
      .filter((info) => {
        return info.user_no.includes(userInput);
      })
      .slice(offset, offset + 12),
    [userInput, infos, offset],
  );

  // 파일 읽기
  const onChangeFile = (e) => {
    const formData = new FormData();
    formData.append('user_input', e.target.files[0]);
    dispatch(excel(formData));
    /*
    let input = e.target;
    let reader = new FileReader();
    let user_type = null;
    let name = null;
    let user_no = null;
    let email = null;
    let pwd = 3;

    reader.onload = function () {
      let data = reader.result;
      let workBook = read(data, { type: 'binary' });

      workBook.SheetNames.forEach(function (sheetName) {
        let rows = utils.sheet_to_json(workBook.Sheets[sheetName]);
        for (let i = 0; i < rows.length; i++) {
          user_type = rows[i].user_type;
          name = rows[i].name;
          user_no = rows[i].user_no.toString();
          email = rows[i].email;
          dispatch(insert({ user_type, name, user_no, email, pwd }));
        }
      });
      
    };
    reader.readAsBinaryString(input.files[0]);*/
  };
  if (
    loading_excel ||
    loading_insert ||
    loading_take ||
    loading_remove ||
    loading_change ||
    loading_bulkrm
  ) {
    return <Loading />;
  }
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
          <CsvLinkStyled
            data={excelInfo.results}
            filename="Error_Reason.csv"
            disabled={excelInfo.error_occured === false}
          >
            Error
          </CsvLinkStyled>
          <LinkBlock to="/admin/member/add">Add</LinkBlock>
          <LinkBlock to="delete">Delete</LinkBlock>
          <LabelCsvBlock htmlFor="memberCsv">CSV</LabelCsvBlock>
          <CsvBlock
            type="file"
            id="memberCsv"
            accept=".csv"
            onChange={onChangeFile}
          />
        </ButtonsBlock>
      </FliterAddBlock>
      <ContentBlock>
        <UserTable infos={filterInfo} />
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

export default MemberManagementsPage;
