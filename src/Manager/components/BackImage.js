import styled from 'styled-components';
import SJ_U from '../assets/img/sejong_universy.png';

const BackImageBlock = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: -1;
  &::before {
    content: '';
    background-image: url(${SJ_U});
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.2;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
`;

const BackImage = ({ children }) => {
  return <BackImageBlock>{children}</BackImageBlock>;
};

export default BackImage;
