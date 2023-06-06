import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { remove } from '../../store/modules/regular';
import TrashIconURL from '../../assets/img/trash.png';
import LogoutModal from '../../components/LogoutModal';

const TableBlock = styled.table`
  width: 100%;
  margin: 0 auto;
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
  width: 15%;
  border-right: 0.1px solid white;
`;
const TheadTd2 = styled.td`
  width: 15%;
  border-right: 0.1px solid white;
`;
const TheadTd3 = styled.td`
  width: 20%;
  border-right: 0.1px solid white;
`;
const TheadTd4 = styled.td`
  width: 15%;
  border-right: 0.1px solid white;
`;
const TheadTd5 = styled.td`
  width: 25%;
  border-right: 0.1px solid white;
`;
const TheadTd6 = styled.td`
  width: 10%;
`;

const TrBlock = styled.tr`
  height: 2.5rem;
  &:hover {
    background: #eceaea;
  }
`;

const Td1 = styled.td`
  width: 15%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td2 = styled.td`
  width: 15%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td3 = styled.td`
  width: 20%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td4 = styled.td`
  width: 15%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td5 = styled.td`
  width: 25%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td6 = styled.td`
  width: 10%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;

const TrashIcon = styled.div`
  background-image: url(${TrashIconURL});
  background-size: contain;
  background-repeat: no-repeat;
  width: 1.3rem;
  height: 1.3rem;
  display: inline-block;
  cursor: pointer;
`;

const RegularUserTable = ({ infos }) => {
  const dispatch = useDispatch();

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
  }, [id]);

  function ConvertType(i) {
    if (i === 1) return '관리자';
    else if (i === 2) return '교직원';
    else if (i === 3) return '대학원생';
    else return '학부생';
  }

  function ConvertDay(i) {
    i = i.replace('MON', '월');
    i = i.replace('TUE', '화');
    i = i.replace('WED', '수');
    i = i.replace('THR', '목');
    i = i.replace('FRI', '금');
    i = i.replace('SAT', '토');
    i = i.replace('SUN', '일');
    return i;
  }

  const infoList =
    infos.length > 0 ? (
      infos.map((info) => (
        <TrBlock key={info.id}>
          <Td1>{info.room.name}</Td1>
          <Td2>
            {info.booker.name}({ConvertType(info.booker.user_type)})
          </Td2>
          <Td3>{Object.values(ConvertDay(info.day.join(', ')))}</Td3>
          <Td4>
            {info.start.slice(0, 5)}-{info.end.slice(0, 5)}
          </Td4>
          <Td5>{info.booker.email}</Td5>
          <Td6>
            <TrashIcon onClick={() => onRemoveClick(info.id)} />
          </Td6>
        </TrBlock>
      ))
    ) : (
      <tr>
        <td>게시물이 없습니다.</td>
      </tr>
    );
  return (
    <>
      <TableBlock>
        <TheadBlock>
          <tr>
            <TheadTd1>Room</TheadTd1>
            <TheadTd2>Name</TheadTd2>
            <TheadTd3>Day</TheadTd3>
            <TheadTd4>Time</TheadTd4>
            <TheadTd5>Email</TheadTd5>
            <TheadTd6>Edit</TheadTd6>
          </tr>
        </TheadBlock>
        <tbody>{infoList}</tbody>
      </TableBlock>
      <LogoutModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
        title="정기예약 삭제"
        description="정말로 삭제하시겠습니까?"
      />
    </>
  );
};

export default RegularUserTable;
