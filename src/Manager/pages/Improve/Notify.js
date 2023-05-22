import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { remove, take } from '../../store/modules/notify';
import { format } from 'date-fns';

import Button from '../../components/Button';

const StyledBlock = styled.div`
  width: 70rem;
  height: 20rem;
  border: 1px solid #5f6d7c;
  border-radius: 0.25rem;
  padding: 1rem;
  background-color: rgb(248, 249, 251);
  position: relative;
  margin-bottom: 1.5rem;
`;
const TitleBlock = styled.div`
  display: flex;
`;
const TitleText = styled.div`
  font-family: 'InterBold';
  font-weight: 700;
  color: #5f6d7c;
`;
const AddLink = styled(Link)`
  text-decoration: none;
  margin-left: auto;
  font-size: 1.2rem;
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
const TheadTd0 = styled.td`
  width: 5%;
`;
const TheadTd1 = styled.td`
  width: 55%;
`;
const TheadTd2 = styled.td`
  width: 30%;
`;
const TheadTd3 = styled.td`
  width: 10%;
`;
const TBodyTrBlock = styled.tr`
  width: 100%;
  height: 2.5rem;
  border-bottom: 0.5px solid #5f6d7c;
  &:hover {
    background-color: rgba(248, 249, 251, 0.5);
  }
`;
const Td0 = styled.td`
  width: 5%;
`;
const Td1 = styled.td`
  width: 55%;
  text-align: start;
  font-family: 'InterBold';
  font-weight: 400;
`;
const Td2 = styled.td`
  width: 30%;
`;
const Td3 = styled.td`
  width: 10%;
`;

const DivBlock = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`;
const CorrectLink = styled(Link)`
  width: 3rem;
  height: 2rem;
  font-family: 'InterLight';
  font-size: 1rem;
  font-weight: normal;
  text-decoration: none;
  border-radius: 0.25rem;
  line-height: 2rem;
  color: #5f6d73;
  cursor: pointer;
  &:hover {
    background-color: rgb(209, 217, 226);
  }
`;
const DeleteButton = styled(Button)`
  width: 3rem;
  height: 2rem;
  color: #5f6d73;
  font-family: 'InterLight';
  font-weight: normal;
  background-color: rgb(248, 249, 251);
  &:hover {
    background-color: rgb(209, 217, 226);
  }
`;

const Notify = () => {
  useEffect(() => {
    dispatch(take());
    console.log('11');
  }, []);
  const infos = useSelector(({ notify }) => notify.infos);
  const dispatch = useDispatch();
  const onRemove = (id) => {
    dispatch(remove(id));
  };

  const infoList = infos.map((info, idx) => (
    <TBodyTrBlock id={info.id}>
      <Td0>{idx + 1}.</Td0>
      <Td1>{info.title}</Td1>
      <Td2>{info.end}</Td2>
      <Td3>
        <DivBlock>
          <CorrectLink to={`/admin/improve/notify/correct/${info.id}`}>
            수정
          </CorrectLink>
          <DeleteButton onClick={() => onRemove(info.id)}>삭제</DeleteButton>
        </DivBlock>
      </Td3>
    </TBodyTrBlock>
  ));
  return (
    <StyledBlock>
      <TitleBlock>
        <TitleText>공지사항</TitleText>
        <AddLink to="notify/add">+</AddLink>
      </TitleBlock>
      <TableBlock>
        <TheadBlock>
          <TheadTrBlock>
            <TheadTd0>No.</TheadTd0>
            <TheadTd1>Title</TheadTd1>
            <TheadTd2>Date</TheadTd2>
            <TheadTd3>Edit</TheadTd3>
          </TheadTrBlock>
        </TheadBlock>
        <tbody>{infoList}</tbody>
      </TableBlock>
    </StyledBlock>
  );
};

export default Notify;
