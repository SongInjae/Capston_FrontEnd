import styled from 'styled-components';

import Button from '../../components/Button';

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
  width: 12%;
`;
const TheadTd2 = styled.td`
  width: 20%;
`;
const TheadTd3 = styled.td`
  width: 16%;
`;
const TheadTd4 = styled.td`
  width: 24%;
`;
const TheadTd5 = styled.td`
  width: 28%;
`;

const TrBlock = styled.tr`
  height: 2.5rem;
  &:hover {
    background: #eceaea;
  }
`;

const Td1 = styled.td`
  width: 12%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td2 = styled.td`
  width: 20%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td3 = styled.td`
  width: 16%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td4 = styled.td`
  width: 24%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td5 = styled.td`
  width: 28%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const ButtonBlock = styled(Button)`
  width: 80%;
  height: 80%;
`;

const ReservationTable = () => {
  const infos = [
    {
      id: 1,
      date: '4월 16일',
      name: '한동일',
      designation: '교수',
      time: '09:00 - 12:00',
    },
    {
      id: 2,
      date: '4월 19일',
      name: '멍멍이',
      designation: '조교',
      time: '18:00 - 20:00',
    },
    {
      id: 3,
      date: '5월 11일',
      name: '송인재',
      designation: '학생',
      time: '15:00 - 16:00',
    },
  ];
  const infoList = infos.map((info) => (
    <TrBlock id={info.id}>
      <Td1>{info.date}</Td1>
      <Td2>{info.name}</Td2>
      <Td3>{info.designation}</Td3>
      <Td4>{info.time}</Td4>
      <Td5>
        <ButtonBlock>삭제</ButtonBlock>
      </Td5>
    </TrBlock>
  ));
  return (
    <TableBlock>
      <TheadBlock>
        <tr>
          <TheadTd1>Date</TheadTd1>
          <TheadTd2>Name</TheadTd2>
          <TheadTd3>Designation</TheadTd3>
          <TheadTd4>Time</TheadTd4>
          <TheadTd5>Edit</TheadTd5>
        </tr>
      </TheadBlock>
      <tbody>{infoList}</tbody>
    </TableBlock>
  );
};

export default ReservationTable;
