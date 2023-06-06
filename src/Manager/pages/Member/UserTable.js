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
  width: 15%;
  border-right: 0.1px solid white;
`;
const TheadTd2 = styled.td`
  width: 20%;
  border-right: 0.1px solid white;
`;
const TheadTd3 = styled.td`
  width: 20%;
  border-right: 0.1px solid white;
`;
const TheadTd4 = styled.td`
  width: 25%;
  border-right: 0.1px solid white;
`;
const TheadTd5 = styled.td`
  width: 20%;
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
  width: 20%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td3 = styled.td`
  width: 20%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td4 = styled.td`
  width: 25%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;
const Td5 = styled.td`
  width: 20%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.2);
`;

const UserTable = ({ infos }) => {
  const infoList =
    infos.length > 0 ? (
      infos.map((info) => (
        <TrBlock key={info.id}>
          <Td1>{info.user_type.name}</Td1>
          <Td2>{info.name}</Td2>
          <Td3>{info.user_no}</Td3>
          <Td4>{info.email}</Td4>
          <Td5>
            <Menu info={info} />
          </Td5>
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
