import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, insert } from './modules/notify';
import { useNavigate } from 'react-router-dom';

import NotifyAdd from '../pages/Improve/NotifyAdd';
import { format } from 'date-fns';

const NotifyAddForm = () => {
  const start = new Date();
  const [end, setEnd] = useState(new Date());
  //const date = format(start, 'yyyy.MM.dd');
  const navigate = useNavigate();

  const { title, content } = useSelector(({ notify }) => ({
    title: notify.title,
    content: notify.content,
  }));
  const dispatch = useDispatch();

  const formData = new FormData();

  useEffect(() => {
    formData.append('title', title);
    formData.append('content', content);
    formData.append('start', format(start, 'yyyy-MM-dd'));
    //formData.append('end', end);
  }, [title, content, start, end]);

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [],
  );

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
    let entries = formData.entries();
    for (const pair of entries) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    setEnd(new Date());
    dispatch(insert(formData));
    navigate(-1);
  };

  return (
    <NotifyAdd
      onChange={onChange}
      onSubmit={onSubmit}
      onChangeField={onChangeField}
    />
  );
};

export default NotifyAddForm;
