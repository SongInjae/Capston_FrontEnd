import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { remove, take } from '../../store/modules/notify';

import LogoutModal from '../../components/LogoutModal';
import Button from '../../components/Button';
import Pagenation from '../../components/Pagenation';

const StyledBlock = styled.div`
  width: 70rem;
  height: 22rem;
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
  margin: 1.5rem auto 0;
  text-align: center;
  border-collapse: collapse;
  border-spacing: 0;
  font-family: 'InterLight';
  flex: 1;
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
  }, []);
  const infos = useSelector(({ notify }) => notify.infos);
  const dispatch = useDispatch();

  //모달 구현
  const [id, setId] = useState();
  const [modal, setModal] = useState(false);
  const onRemoveClick = (infoId) => {
    setModal(true);
    setId(infoId);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = useCallback(() => {
    setModal(false);
    dispatch(remove(id));
  }, [id, dispatch]);

  //페이지네이션
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 5;

  //공지사항 정보
  const infoList = infos.map((info, idx) => (
    <TBodyTrBlock key={info.id}>
      <Td0>{idx + 1}.</Td0>
      <Td1>{info.title}</Td1>
      <Td2>{info.end.replace('T', ' ').substring(0, 16)}</Td2>
      <Td3>
        <DivBlock>
          <CorrectLink to={`/admin/improve/notify/correct/${info.id}`}>
            수정
          </CorrectLink>
          <DeleteButton onClick={() => onRemoveClick(info.id)}>
            삭제
          </DeleteButton>
        </DivBlock>
      </Td3>
    </TBodyTrBlock>
  ));

  const onePageInfo = infoList.slice(offset, offset + 5);

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
        <tbody>{onePageInfo}</tbody>
      </TableBlock>
      <LogoutModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
        title="공지사항 삭제"
        description="정말로 삭제하시겠습니까?"
      />
      <Pagenation
        noflex={true}
        total={infos.length}
        limit={5}
        page={page}
        setPage={setPage}
      />
    </StyledBlock>
  );
};

export default Notify;
