import { useDispatch, useSelector } from 'react-redux';
import { changeField, insert } from './modules/addmember';
import AddMember from '../pages/Member/AddMember';
import { useNavigate } from 'react-router-dom';

const InfoForm = () => {
  const { name, number, email, pwd, designation } = useSelector(
    ({ addmembers }) => ({
      designation: addmembers.designation,
      name: addmembers.name,
      number: addmembers.number,
      email: addmembers.email,
      pwd: addmembers.pwd,
    }),
  );
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
    dispatch(insert({ designation, name, number, email, pwd }));
    navigate(-1);
  };

  return <AddMember onChange={onChange} onSubmit={onSubmit} />;
};

export default InfoForm;
