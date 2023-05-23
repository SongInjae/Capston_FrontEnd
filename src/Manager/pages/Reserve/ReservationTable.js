import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { remove } from '../../store/modules/reserve';
import TrashIconURL from '../../assets/img/trash.png';

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
  width: 10%;
  border-right: 0.1px solid white;
`;
const TheadTd2 = styled.td`
  width: 15%;
  border-right: 0.1px solid white;
`;
const TheadTd3 = styled.td`
  width: 15%;
  border-right: 0.1px solid white;
`;
const TheadTd4 = styled.td`
  width: 25%;
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
  width: 10%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td2 = styled.td`
  width: 15%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td3 = styled.td`
  width: 15%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td4 = styled.td`
  width: 25%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td5 = styled.td`
  width: 25%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td6 = styled.td`
  width: 10%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
  text-align: center;
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

const ReservationTable = ({ infos }) => {
  const dispatch = useDispatch();
  const onRemove = (id) => dispatch(remove(id));

  const infoList =
    infos.length > 0 ? (
      infos.map((info) => (
        <TrBlock id={info.id}>
          <Td1>
            {info.date_year}.{info.date_month}.{info.date_day}
          </Td1>
          <Td2>{info.room}</Td2>
          <Td3>
            {info.name}({info.designation})
          </Td3>
          <Td4>{info.time}</Td4>
          <Td5>{info.email}</Td5>
          <Td6>
            <TrashIcon onClick={() => onRemove(info.id)} />
          </Td6>
        </TrBlock>
      ))
    ) : (
      <tr>
        <td>게시물이 없습니다.</td>
      </tr>
    );
  return (
    <TableBlock>
      <TheadBlock>
        <tr>
          <TheadTd1>Date</TheadTd1>
          <TheadTd2>Room</TheadTd2>
          <TheadTd3>Name</TheadTd3>
          <TheadTd4>Time</TheadTd4>
          <TheadTd5>Email</TheadTd5>
          <TheadTd6>Edit</TheadTd6>
        </tr>
      </TheadBlock>
      <tbody>{infoList}</tbody>
    </TableBlock>
  );
};

export default ReservationTable;
