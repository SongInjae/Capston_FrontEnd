import { useDispatch, useSelector } from 'react-redux';
import { changeField, insert } from './modules/rooms';
import MeetingRoomAddPage from '../pages/MeetingRoom/MeetingRoomAddPage';
import { useNavigate } from 'react-router-dom';

const RoomAddForm = () => {
  const { room_name, facility, text } = useSelector(({ rooms }) => ({
    room_name: rooms.room_name,
    facility: rooms.facility,
    text: rooms.text,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { value, id } = e.target;
    dispatch(
      changeField({
        key: id,
        value,
      }),
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(insert({ room_name, facility, text }));
    navigate(-1);
  };
  return <MeetingRoomAddPage onChange={onChange} onSubmit={onSubmit} />;
};

export default RoomAddForm;
