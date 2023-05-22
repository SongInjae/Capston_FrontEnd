import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { changeField, change, take } from './modules/rooms';
import CorrectRoomPage from '../pages/MeetingRoom/CorrectRoomPage';

const RoomCorrectForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /*
  const { id, name, amenities, discription } = useSelector(({ rooms }) => ({
    id: rooms.id,
    name: rooms.name,
    amenities: rooms.amenities,
    discription: rooms.discription,
  }));*/

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

  const formData = new FormData();
  const [file, setFile] = useState(false);
  const [name, setName] = useState(false);
  const [amenities, setAmenities] = useState(false);
  const [discription, setDiscription] = useState(false);

  useEffect(() => {
    if (name !== false) formData.append('name', name);
    if (amenities !== false) formData.append('amenities', amenities);
    if (discription !== false) formData.append('discription', discription);
    if (file !== false) formData.append('image', file);
  }, [name, amenities, discription, file]);

  const onChange = useCallback(
    (name, value) => {
      dispatch(changeField({ key: name, value }));
    },
    [dispatch],
  );
  const onSubmit = (e) => {
    let entries = formData.entries();
    for (const pair of entries) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    console.log(room.id);
    e.preventDefault();
    dispatch(change({ id: room.id, formData }));
    navigate(-1);
    dispatch(take());
  };
  return (
    <CorrectRoomPage
      room={room}
      setFile={setFile}
      setNamea={setName}
      setAmenitiesa={setAmenities}
      setDiscriptiona={setDiscription}
      //onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RoomCorrectForm;
