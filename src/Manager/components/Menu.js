import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { remove, take } from '../store/modules/addmember';
import { Link } from 'react-router-dom';

//import MenuIconURL from '../assets/img/menu.png';
import CorrectIconURL from '../assets/img/correct.png';
import TrashIconURL from '../assets/img/trash.png';

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
  const onRemove = (id) => {
    dispatch(remove(id));
    dispatch(take());
  };
  const userId = info.id;
  return (
    <DivBlock>
      <CorrectIcon to={`/admin/member/correct/${userId}`} />
      <TrashIcon onClick={() => onRemove(info.id)} />
    </DivBlock>
  );
};
export default Menu;
