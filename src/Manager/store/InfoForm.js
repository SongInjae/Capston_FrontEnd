import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, insert, take } from './modules/addmember';
import AddMember from '../pages/Member/AddMember';
import { useNavigate } from 'react-router-dom';

const InfoForm = () => {
  const [pwd, setPwd] = useState();
  const [chkPwd, setChkPwd] = useState();
  const [error, setError] = useState(false);

  const { name, user_no, email, password, user_type, pwdCheck } = useSelector(
    ({ addmembers }) => ({
      user_type: addmembers.user_type,
      name: addmembers.name,
      user_no: addmembers.user_no,
      email: addmembers.email,
      password: addmembers.password,
      pwdCheck: addmembers.pwdCheck,
    }),
  );
  useEffect(() => {
    setPwd(password);
    setChkPwd(pwdCheck);
    if (pwd !== chkPwd) {
      setError('비밀번호가 다릅니다');
    } else {
      setError(false);
    }
  }, [pwd, password, chkPwd, pwdCheck]);

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
  const onTypeChange = (e) => {
    const value = e.target.value;
    dispatch(changeField({ key: 'user_type', value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(insert({ user_type, name, user_no, email, password }));
    navigate(-1);
    dispatch(take());
  };

  return (
    <AddMember
      error={error}
      onChange={onChange}
      onTypeChange={onTypeChange}
      onSubmit={onSubmit}
    />
  );
};

export default InfoForm;
