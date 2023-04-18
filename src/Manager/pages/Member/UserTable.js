import styled from 'styled-components';

import Menu from '../../components/Menu';

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

const UserTable = () => {
  const infos = [
    {
      id: 1,
      designation: '교수',
      name: '한동일',
      number: '12345678',
      email: 'dsjl@sejong.ac.kr',
    },
    {
      id: 2,
      designation: '조교',
      name: '멍멍이',
      number: '41345678',
      email: 'dsjl@naver.com',
    },
    {
      id: 3,
      designation: '학생',
      name: '송인재',
      number: '12562678',
      email: 'jgh@naver.com',
    },
  ];
  const infoList = infos.map((info) => (
    <TrBlock id={info.id}>
      <Td1>{info.designation}</Td1>
      <Td2>{info.name}</Td2>
      <Td3>{info.number}</Td3>
      <Td4>{info.email}</Td4>
      <Td5>
        <Menu />
      </Td5>
    </TrBlock>
  ));
  return (
    <TableBlock>
      <TheadBlock>
        <tr>
          <TheadTd1>Designation</TheadTd1>
          <TheadTd2>Name</TheadTd2>
          <TheadTd3>Number</TheadTd3>
          <TheadTd4>E-mail</TheadTd4>
          <TheadTd5>Edit</TheadTd5>
        </tr>
      </TheadBlock>
      <tbody>{infoList}</tbody>
    </TableBlock>
  );
};

export default UserTable;
