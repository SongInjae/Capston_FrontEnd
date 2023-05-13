import { useDispatch, useSelector } from 'react-redux';
import { changeField, insert } from './modules/notify';
import { useNavigate } from 'react-router-dom';

import NotifyAdd from '../pages/Improve/NotifyAdd';
import { format } from 'date-fns';

const NotifyAddForm = () => {
  const current = new Date();
  const date = format(current, 'yyyy.MM.dd');
  const navigate = useNavigate();

  const { title, text } = useSelector(({ notify }) => ({
    title: notify.title,
    text: notify.text,
  }));
  const dispatch = useDispatch();

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
    dispatch(insert({ title, text, date }));
    navigate(-1);
  };

  return <NotifyAdd onChange={onChange} onSubmit={onSubmit} />;
};

export default NotifyAddForm;
