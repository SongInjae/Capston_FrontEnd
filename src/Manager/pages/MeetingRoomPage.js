import { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { remove } from '../store/modules/rooms';
import { take } from '../store/modules/rooms';
import Pagenation from '../components/Pagenation';
import LogoutModal from '../components/LogoutModal';

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
  height: 18rem;
  margin-top: 0.5rem;
  flex: 1;
`;
const RoomBlock = styled.div`
  width: 20rem;
  height: 18rem;
  margin: 0 2rem;
`;
const RoomImage = styled.img`
  width: 100%;
  height: 15rem;
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

  const [page, setPage] = useState(1);
  const offset = (page - 1) * 1;

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
  }, []);

  let roomsInfos = [];
  let cnt = 0;
  for (let i = offset; i <= rooms.length; i += 3) {
    let room = [];
    cnt += 1;
    if (cnt === 3) break;
    if (i > offset) break;
    for (let j = 0; j < 3; j++) {
      //if (i + j === rooms.length) break;
      if (j === 1) break;
      room.push(
        <RoomBlock key={rooms[i + j].id}>
          <RoomImage
            image={rooms[i + j].images.image ? rooms[i + j].images.image : ''}
          />
          <RoomInfoBlock>
            <RoomName>{rooms[i + j].name}</RoomName>
            <RoomInfoCorrectBtn to={`/admin/room/correct/${rooms[i + j].id}`}>
              수정
            </RoomInfoCorrectBtn>
            <RoomInfoCorrectBtn onClick={() => onRemoveClick(rooms[i + j].id)}>
              삭제
            </RoomInfoCorrectBtn>
          </RoomInfoBlock>
        </RoomBlock>,
      );
    }
    roomsInfos.push(<RoomRowBlock key={i}>{room}</RoomRowBlock>);
  }

  return (
    <>
      <FliterAddBlock>
        <FileBlock to="/admin/room/add">회의실 추가</FileBlock>
      </FliterAddBlock>
      {roomsInfos}
      <Pagenation
        total={rooms.length}
        limit={1}
        page={page}
        setPage={setPage}
      />
      <LogoutModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
        title="회의실 삭제"
        description="정말로 삭제하시겠습니까?"
      />
    </>
  );
};

export default MeetingRoomPage;
