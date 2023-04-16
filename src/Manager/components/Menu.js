import styled from 'styled-components';
import MenuIconURL from '../assets/img/menu.png';
import CorrectIconURL from '../assets/img/correct.png';
import TrashIconURL from '../assets/img/trash.png';

const DivBlock = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;
const MenuIcon = styled.div`
  background-image: url(${MenuIconURL});
  background-size: contain;
  background-repeat: no-repeat;
  width: 1.3em;
  height: 1.3rem;
`;
const CorrectIcon = styled.div`
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
`;

const Menu = () => {
  return (
    <DivBlock>
      <MenuIcon />
      <CorrectIcon />
      <TrashIcon />
    </DivBlock>
  );
};

export default Menu;
