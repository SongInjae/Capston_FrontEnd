import { useCallback } from 'react';
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
  const date = format(current, 'yyyy.MM.dd');

  const { id, title, text } = useSelector(({ notify }) => ({
    id: notify.id,
    title: notify.title,
    text: notify.text,
  }));

  let Id = parseInt(params.id);
  const { notify } = useSelector(({ notify }) => ({
    notify: notify.infos[Id - 1],
  }));

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
    const idx = Id;
    dispatch(change({ idx, id, title, text, date }));
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
