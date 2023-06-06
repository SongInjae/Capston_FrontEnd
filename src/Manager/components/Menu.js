import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { remove, take } from '../store/modules/addmember';
import { Link } from 'react-router-dom';

//import MenuIconURL from '../assets/img/menu.png';
import CorrectIconURL from '../assets/img/correct.png';
import TrashIconURL from '../assets/img/trash.png';
import LogoutModal from './LogoutModal';

const DivBlock = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`; /*
const MenuIcon = styled.div`
  background-image: url(${MenuIconURL});
  background-size: contain;
  background-repeat: no-repeat;
  width: 1.3em;
  height: 1.3rem;
`;*/
const CorrectIcon = styled(Link)`
  background-image: url(${CorrectIconURL});
  background-size: contain;
  background-repeat: no-repeat;
  width: 1.3rem;
  height: 1.3rem;
`;
const TrashIcon = styled.div`
  background-image: url(${TrashIconURL});
  background-size: contain;
  background-repeat: no-repeat;
  width: 1.3rem;
  height: 1.3rem;
  cursor: pointer;
`;

const Menu = ({ info }) => {
  const dispatch = useDispatch();
  const userId = info.id;

  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = useCallback(() => {
    setModal(false);
    dispatch(remove(userId));
    dispatch(take());
  }, []);

  return (
    <DivBlock>
      <CorrectIcon to={`/admin/member/correct/${userId}`} />
      <TrashIcon onClick={onRemoveClick} />
      <LogoutModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
        title="회원정보 삭제"
        description="정말로 삭제하시겠습니까?"
      />
    </DivBlock>
  );
};
export default Menu;
