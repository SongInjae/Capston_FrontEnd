import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { changeField, change } from './modules/addmember';
import CorrectMember from '../pages/Member/CorrectMember';

const CorrectForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, name, number, email, designation } = useSelector(
    ({ addmembers }) => ({
      id: addmembers.id,
      designation: addmembers.designation,
      name: addmembers.name,
      number: addmembers.number,
      email: addmembers.email,
    }),
  );

  let Id = parseInt(params.id);
  /*
  const { info } = useSelector(({ addmembers }) => ({
    info: addmembers.info[Id - 1],
  }));
  */
  const { infos } = useSelector(({ addmembers }) => ({
    infos: addmembers.info,
  }));
  let info = null;
  for (let i = 0; i <= infos.length; i++) {
    if (infos[i].id === Id) {
      info = infos[i];
      break;
    }
  }
  const onChange = useCallback(
    (name, value) => {
      dispatch(
        changeField({
          key: name,
          value,
        }),
      );
    },
    [dispatch],
  );
  const onSubmit = (e) => {
    e.preventDefault();
    const idx = Id;
    const pwd = 3;
    dispatch(change({ idx, id, designation, name, number, email, pwd }));
    navigate(-1);
  };
  return <CorrectMember info={info} onChange={onChange} onSubmit={onSubmit} />;
};

export default CorrectForm;
