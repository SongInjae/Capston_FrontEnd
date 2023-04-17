import styled from 'styled-components';
import { Link } from 'react-router-dom';

import sea_img from '../assets/img/search.png';
import UserTable from './Member/UserTable';

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
const NameBlock = styled.div`
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

const MemberManagementsPage = () => {
  return (
    <>
      <FliterAddBlock>
        <NameFliterBlock>
          <NameBlock>Name</NameBlock>
          <NameSearchBlock>
            <SearchImage />
            <SearchBlock placeholder="Search" />
          </NameSearchBlock>
        </NameFliterBlock>
        <ButtonsBlock>
          <FileBlock to="/admin/member/add">Add</FileBlock>
          <FileBlock>CSV</FileBlock>
        </ButtonsBlock>
      </FliterAddBlock>
      <ContentBlock>
        <UserTable />
      </ContentBlock>
    </>
  );
};

export default MemberManagementsPage;
