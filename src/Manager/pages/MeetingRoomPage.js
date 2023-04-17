import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FliterAddBlock = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  border-bottom: 0.1rem solid #f7f9fc;
`;
const FileBlock = styled(Link)`
  position: absolute;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'InterLight';
  font-size: 0.8rem;
  margin-right: 1rem;
  width: 6rem;
  height: 2rem;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  background-color: rgb(195, 0, 47);
  &:hover {
    background: rgba(105, 0, 47, 0.1);
  }
`;

const RoomRowBlock = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70rem;
  height: 22rem;
  margin-top: 1rem;
`;
const RoomBlock = styled.div`
  width: 20rem;
  height: 22rem;
`;
const RoomImage = styled.img`
  width: 100%;
  height: 16rem;
  border: 1px solid #000;
  border-radius: 0.6rem;
  background: #f7f9fc;
`;
const RoomInfoBlock = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const RoomName = styled.div`
  width: 10rem;
  height: 100%;
  display: flex;
  align-items: center;
  color: #5f6d73;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'InterBold';
`;
const RoomInfoCorrectBtn = styled(Link)`
  width: 5rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  background-color: rgb(195, 0, 47);
  &:hover {
    background: rgba(105, 0, 47, 0.1);
  }
`;

const MeetingRoomPage = () => {
  return (
    <>
      <FliterAddBlock>
        <FileBlock to="/admin/room/add">회의실 추가</FileBlock>
      </FliterAddBlock>
      <RoomRowBlock>
        <RoomBlock>
          <RoomImage />
          <RoomInfoBlock>
            <RoomName>대양AI센터835호</RoomName>
            <RoomInfoCorrectBtn>수정</RoomInfoCorrectBtn>
          </RoomInfoBlock>
        </RoomBlock>
        <RoomBlock>
          <RoomImage />
          <RoomInfoBlock>
            <RoomName>대양AI센터836호</RoomName>
            <RoomInfoCorrectBtn>수정</RoomInfoCorrectBtn>
          </RoomInfoBlock>
        </RoomBlock>
        <RoomBlock>
          <RoomImage />
          <RoomInfoBlock>
            <RoomName>대양AI센터837호</RoomName>
            <RoomInfoCorrectBtn>수정</RoomInfoCorrectBtn>
          </RoomInfoBlock>
        </RoomBlock>
      </RoomRowBlock>
    </>
  );
};

export default MeetingRoomPage;
