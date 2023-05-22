import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import NotifyCorrect from '../pages/Improve/NotifyCorrect';
import { changeField, change } from './modules/notify';

const NotifyCorrectForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = new Date();
  const date = format(current, 'yyyy-MM-dd');

  const { id, title, content } = useSelector(({ notify }) => ({
    id: notify.id,
    title: notify.title,
    content: notify.content,
  }));

  let Id = parseInt(params.id);
  const { notify } = useSelector(({ notify }) => ({
    notify: notify.infos[Id - 1],
  }));

  const formData = new FormData();

  useEffect(() => {
    formData.append('title', title);
    formData.append('content', content);
    formData.append('start', date);
  });

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [],
  );

  const onChange = useCallback(
    (name, value) => {
      dispatch(changeField({ key: name, value }));
    },
    [dispatch],
  );
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(change({ id, formData }));
    navigate(-1);
  };

  return (
    <NotifyCorrect
      notify={notify}
      onChange={onChange}
      onSubmit={onSubmit}
      onChangeField={onChangeField}
    />
  );
};

export default NotifyCorrectForm;
