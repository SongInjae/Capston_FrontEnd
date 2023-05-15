import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { changeField, change } from './modules/rooms';
import CorrectRoomPage from '../pages/MeetingRoom/CorrectRoomPage';

const RoomCorrectForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, room_name, facility, text } = useSelector(({ rooms }) => ({
    id: rooms.id,
    room_name: rooms.room_name,
    facility: rooms.facility,
    text: rooms.text,
  }));

  let Id = parseInt(params.id);
  const { room } = useSelector(({ rooms }) => ({
    room: rooms.rooms[Id - 1],
  }));

  const onChange = useCallback(
    (name, value) => {
      dispatch(changeField({ key: name, value }));
    },
    [dispatch],
  );
  const onSubmit = (e) => {
    e.preventDefault();
    const idx = Id;
    dispatch(change({ idx, id, room_name, facility, text }));
    navigate(-1);
  };
  return (
    <CorrectRoomPage room={room} onChange={onChange} onSubmit={onSubmit} />
  );
};

export default RoomCorrectForm;
