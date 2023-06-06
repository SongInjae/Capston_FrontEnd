import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SJ_U from '../../../Manager/assets/img/sejong_universy.png';
//import SJ_U from '../../../Manager/assets/img/sejong_ai_center.jpeg';

const BackImageBlock = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: -1;
  &::before {
    content: '';
    background-image: url(${SJ_U});
    background-position: 0% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.3;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
`;

const LoginTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  //background-image: url(${SJ_U});
  //background-repeat: no-repeat;
  //background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 20rem;
  background: white;
  border-radius: 2px;
  @media screen and (max-width: 480px){
    display: flex;
    width : 180px;
    height : 120px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const LinkBlock = styled(Link)`
  text-decoration: none;
  color: black;
`;

const LoginTemplate = ({ children }) => {
  return (
    <>
      <BackImageBlock />
      <LoginTemplateBlock>
        <WhiteBox>
          <div className="logo-area">
            <LinkBlock to="/">SEJONG MEET-UP</LinkBlock>
          </div>
          {children}
        </WhiteBox>
      </LoginTemplateBlock>
    </>
  );
};

export default LoginTemplate;
