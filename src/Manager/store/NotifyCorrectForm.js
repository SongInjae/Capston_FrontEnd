import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import NotifyCorrect from '../pages/Improve/NotifyCorrect';
import { changeField, change } from './modules/notify';

const NotifyCorrectForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = new Date();
  current.setHours(current.getHours() + 9);

  const { id, title, content, notifys } = useSelector(({ notify }) => ({
    notifys: notify.infos,
    id: notify.id,
    title: notify.title,
    content: notify.content,
  }));

  let Id = parseInt(params.id);
  let notify = null;
  for (let i = 0; i < notifys.length; i++) {
    if (notifys[i].id === Id) {
      notify = notifys[i];
      break;
    }
  }

  const formData = new FormData();

  useEffect(() => {
    formData.append('title', title);
    formData.append('content', content);
    formData.append('end', current.toISOString());
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
