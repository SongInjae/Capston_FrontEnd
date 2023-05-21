import { useDispatch, useSelector } from 'react-redux';
import { changeField, insert } from './modules/rooms';
import MeetingRoomAddPage from '../pages/MeetingRoom/MeetingRoomAddPage';
import { useNavigate } from 'react-router-dom';

const RoomAddForm = () => {
  const { name, amenities, discription, images } = useSelector(({ rooms }) => ({
    name: rooms.name,
    amenities: rooms.amenities,
    discription: rooms.discription,
    images: rooms.images,
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
  const formData = new FormData();
  formData.append('name', name);
  formData.append('amenities', amenities);
  formData.append('discription', discription);
  formData.append('images', images);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(insert(formData));
    navigate(-1);
  };
  return <MeetingRoomAddPage onChange={onChange} onSubmit={onSubmit} />;
};

export default RoomAddForm;
