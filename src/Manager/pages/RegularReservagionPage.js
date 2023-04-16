import styled from 'styled-components';

import sea_img from '../assets/img/search.png';
import RegularUserTable from './Regular/RegularUserTable';

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

const ContentBlock = styled.div`
  flex: 1;
`;

const RegularReservagionPage = () => {
  return (
    <>
      <FliterBlock>
        <NameFliterBlock>
          <NameBlock>Name</NameBlock>
          <NameSearchBlock>
            <SearchImage />
            <SearchBlock placeholder="Search" />
          </NameSearchBlock>
        </NameFliterBlock>
      </FliterBlock>
      <ContentBlock>
        <RegularUserTable />
      </ContentBlock>
    </>
  );
};

export default RegularReservagionPage;
