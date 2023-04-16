import styled, { css } from 'styled-components';
import Button from '../../components/Button';

const StyledBlock = styled.div`
  width: 30rem;
  height: 40rem;
  border: 1px solid #5f6d7c;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-left: 9rem;
  background-color: rgb(248, 249, 251);
  position: relative;
`;
const TitleBlock = styled.div`
  font-family: 'InterBold';
  font-weight: 700;
  color: #5f6d7c;
`;
const TableBlock = styled.table`
  width: 100%;
  margin: 1.5rem auto;
  text-align: center;
  border-collapse: collapse;
  border-spacing: 0;
  font-family: 'InterLight';
`;
const TheadBlock = styled.thead`
  width: 100%;
  height: 2.5rem;
  color: rgb(81, 98, 111);
`;
const TheadTrBlock = styled.tr`
  border-top: 0.5px solid #5f6d7c;
  border-bottom: 0.5px solid #5f6d7c;
`;
const TheadTd1 = styled.td`
  width: 25%;
`;
const TheadTd2 = styled.td`
  width: 25%;
`;
const TheadTd3 = styled.td`
  width: 25%;
`;
const TheadTd4 = styled.td`
  width: 25%;
`;
const TBodyTrBlock = styled.tr`
  width: 100%;
  height: 4rem;
  border-bottom: 0.5px solid #5f6d7c;
  &:hover {
    background-color: rgba(248, 249, 251, 0.5);
  }
`;
const Td1 = styled.td`
  width: 25%;
`;
const Td2 = styled.td`
  width: 25%;
`;
const Td3 = styled.td`
  width: 25%;
`;
const Td4 = styled.td`
  width: 25%;
`;
const RcButton = styled(Button)`
  width: 4rem;
  height: 1.5rem;
  font-size: 0.8rem;
  font-weight: 400;

  ${(props) =>
    props.yet &&
    css`
      background-color: #51626f;
    `}
`;
const MoreLink = styled(Button)`
  position: absolute;
  bottom: 2rem;
  width: 93%;
  height: 3rem;
  font-family: 'InterLight';
  font-size: 1rem;
  text-decoration: none;
  border-radius: 0.25rem;
  cursor: pointer;
  color: white;
  background-color: rgb(81, 98, 111);
  &:hover {
    background: rgba(81, 98, 111, 0.1);
  }
`;

const Discomfort = () => {
  return (
    <StyledBlock>
      <TitleBlock>불편사항 접수</TitleBlock>
      <TableBlock>
        <TheadBlock>
          <TheadTrBlock>
            <TheadTd1>Designation</TheadTd1>
            <TheadTd2>Name</TheadTd2>
            <TheadTd3>Date</TheadTd3>
            <TheadTd4>Status</TheadTd4>
          </TheadTrBlock>
        </TheadBlock>
        <tbody>
          <TBodyTrBlock>
            <Td1>학부생</Td1>
            <Td2>송인재</Td2>
            <Td3>2022.02.17</Td3>
            <Td4>
              <RcButton>접수완료</RcButton>
            </Td4>
          </TBodyTrBlock>
          <TBodyTrBlock>
            <Td1>학부생</Td1>
            <Td2>홍길동</Td2>
            <Td3>2022.04.11</Td3>
            <Td4>
              <RcButton yet={true}>미접수</RcButton>
            </Td4>
          </TBodyTrBlock>
        </tbody>
      </TableBlock>
      <MoreLink>More +</MoreLink>
    </StyledBlock>
  );
};

export default Discomfort;
