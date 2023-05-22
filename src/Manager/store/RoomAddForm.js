import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, insert, take } from './modules/rooms';
import MeetingRoomAddPage from '../pages/MeetingRoom/MeetingRoomAddPage';
import { useNavigate } from 'react-router-dom';

const RoomAddForm = () => {
  const { name, amenities, discription } = useSelector(({ rooms }) => ({
    name: rooms.name,
    amenities: rooms.amenities,
    discription: rooms.discription,
    images: rooms.images,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formData = new FormData();
  const [file, setFile] = useState();

  useEffect(() => {
    formData.append('name', name);
    formData.append('amenities', amenities);
    formData.append('discription', discription);
    formData.append('image', file);
  }, [name, amenities, discription, file]);

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
    dispatch(insert(formData));
    navigate(-1);
  };

  return (
    <MeetingRoomAddPage
      setFile={setFile}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RoomAddForm;
