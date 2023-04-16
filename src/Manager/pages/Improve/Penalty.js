import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import UserIcon from '../../assets/img/Penaltiy_User.png';

const StyledBlock = styled.div`
  margin-left: 2rem;
  width: 30rem;
  height: 40rem;
  border: 1px solid #5f6d7c;
  border-radius: 0.25rem;
  padding: 1rem;
  position: relative;
`;
const TitleBlock = styled.div`
  font-family: 'InterBold';
  font-weight: 700;
  color: #5f6d7c;
`;
const UserBlock = styled.div`
  display: flex;
  height: 6rem;
  width: 25rem;
  margin-top: 1.5rem;
  margin-left: 1rem;
  border-bottom: 1px solid #5f6d7c;
  ${(props) =>
    props.last &&
    css`
      border: none;
    `}
`;
const ImageInfoBlock = styled.div`
  width: 24em;
  height: 6rem;
  display: flex;
  margin-top: 1rem;
`;
const ImageIcon = styled.div`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
  background-image: url(${UserIcon});
  background-size: contain;
  background-repeat: no-repeat;
`;
const TextBlock = styled.div`
  width: 16rem;
  height: 5rem;
`;
const InfoBlock = styled.div`
  font-weight: 300;
  color: #5f6d7c;

  ${(props) =>
    props.bold &&
    css`
      font-weight: 600;
    `}
`;
const CorrectLink = styled(Link)`
  width: 5rem;
  height: 2.5rem;
  font-family: 'InterLight';
  font-size: 0.9rem;
  font-weight: 900;
  text-decoration: none;
  text-align: center;
  padding-top: 0.6rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
  color: #5f6d73;
  cursor: pointer;
  background-color: rgb(209, 217, 226);
  &:hover {
    background: rgba(209, 217, 226, 0.1);
  }
`;
const MoreLink = styled(Button)`
  position: absolute;
  bottom: 2rem;
  width: 93%;
  height: 3rem;
  font-family: 'InterLight';
  font-size: 1rem;
  text-decoration: none;
  border-radius: 0.25rem;
  margin-top: 2rem;
  cursor: pointer;
  color: white;
  background-color: rgb(81, 98, 111);
  &:hover {
    background: rgba(81, 98, 111, 0.1);
  }
`;

const penalty = () => {
  return (
    <StyledBlock>
      <TitleBlock>패널티 회원 관리</TitleBlock>
      <UserBlock>
        <ImageInfoBlock>
          <ImageIcon />
          <TextBlock>
            <InfoBlock bold={true}>홍길동</InfoBlock>
            <InfoBlock>학부생</InfoBlock>
            <InfoBlock>Date: 2023.04.14 ~ 2023.05.13</InfoBlock>
          </TextBlock>
        </ImageInfoBlock>
        <CorrectLink>Correct</CorrectLink>
      </UserBlock>
      <UserBlock>
        <ImageInfoBlock>
          <ImageIcon />
          <TextBlock>
            <InfoBlock bold={true}>홍길동</InfoBlock>
            <InfoBlock>학부생</InfoBlock>
            <InfoBlock>Date: 2023.04.14 ~ 2023.05.13</InfoBlock>
          </TextBlock>
        </ImageInfoBlock>
        <CorrectLink>Correct</CorrectLink>
      </UserBlock>
      <UserBlock>
        <ImageInfoBlock>
          <ImageIcon />
          <TextBlock>
            <InfoBlock bold={true}>홍길동</InfoBlock>
            <InfoBlock>학부생</InfoBlock>
            <InfoBlock>Date: 2023.04.14 ~ 2023.05.13</InfoBlock>
          </TextBlock>
        </ImageInfoBlock>
        <CorrectLink>Correct</CorrectLink>
      </UserBlock>
      <UserBlock last={true}>
        <ImageInfoBlock>
          <ImageIcon />
          <TextBlock>
            <InfoBlock bold={true}>홍길동</InfoBlock>
            <InfoBlock>학부생</InfoBlock>
            <InfoBlock>Date: 2023.04.14 ~ 2023.05.13</InfoBlock>
          </TextBlock>
        </ImageInfoBlock>
        <CorrectLink>Correct</CorrectLink>
      </UserBlock>
      <MoreLink>More+</MoreLink>
    </StyledBlock>
  );
};

export default penalty;
