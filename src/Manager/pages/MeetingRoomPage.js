import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { remove } from '../store/modules/rooms';
import { take } from '../store/modules/rooms';

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
  width: 70rem;
  height: 20rem;
  margin-top: 0.5rem;
`;
const RoomBlock = styled.div`
  width: 20rem;
  height: 20rem;
  margin: 0 2rem;
`;
const RoomImage = styled.img`
  width: 100%;
  height: 16rem;
  border: 1px solid #000;
  border-radius: 0.6rem;
  background: #f7f9fc;
  ${(props) =>
    props.image &&
    css`
      background-image: url(${props.image});
      background-size: cover;
      background-repeat: no-repeat;
    `}
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
  width: 4rem;
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
  useEffect(() => {
    dispatch(take());
  }, []);
  const rooms = useSelector(({ rooms }) => rooms.rooms);
  const dispatch = useDispatch();
  const onRemove = (id) => dispatch(remove(id));

  const [imgFile, setImgFile] = useState(false);
  let roomsInfos = [];
  for (let i = 0; i <= rooms.length; i += 3) {
    let room = [];
    for (let j = 0; j < 3; j++) {
      if (i + j === rooms.length) break;
      //console.log(rooms[i + j].images.image);
      room.push(
        <RoomBlock>
          <RoomImage
            image={rooms[i + j].images.image ? rooms[i + j].images.image : ''}
            //image={imgFile}
          />
          <RoomInfoBlock>
            <RoomName>{rooms[i + j].name}</RoomName>
            <RoomInfoCorrectBtn to={`/admin/room/correct/${rooms[i + j].id}`}>
              수정
            </RoomInfoCorrectBtn>
            <RoomInfoCorrectBtn onClick={() => onRemove(rooms[i + j].id)}>
              삭제
            </RoomInfoCorrectBtn>
          </RoomInfoBlock>
        </RoomBlock>,
      );
    }
    roomsInfos.push(<RoomRowBlock>{room}</RoomRowBlock>);
  }

  return (
    <>
      <FliterAddBlock>
        <FileBlock to="/admin/room/add">회의실 추가</FileBlock>
      </FliterAddBlock>
      {roomsInfos}
    </>
  );
};

export default MeetingRoomPage;
