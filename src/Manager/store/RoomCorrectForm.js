import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { changeField, change } from './modules/rooms';
import CorrectRoomPage from '../pages/MeetingRoom/CorrectRoomPage';

const RoomCorrectForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, name, amenities, discription, images } = useSelector(
    ({ rooms }) => ({
      id: rooms.id,
      name: rooms.name,
      amenities: rooms.amenities,
      discription: rooms.discription,
      images: rooms.images,
    }),
  );

  let Id = parseInt(params.id);
  const { rooms } = useSelector(({ rooms }) => ({
    rooms: rooms.rooms,
  }));
  let room = null;
  for (let i = 0; i <= rooms.length; i++) {
    if (rooms[i].id === Id) {
      room = rooms[i];
      break;
    }
  }

  const onChange = useCallback(
    (name, value) => {
      dispatch(changeField({ key: name, value }));
    },
    [dispatch],
  );
  const onSubmit = (e) => {
    e.preventDefault();
    const idx = Id;
    dispatch(change({ idx, id, name, amenities, discription, images }));
    navigate(-1);
  };
  return (
    <CorrectRoomPage room={room} onChange={onChange} onSubmit={onSubmit} />
  );
};

export default RoomCorrectForm;
