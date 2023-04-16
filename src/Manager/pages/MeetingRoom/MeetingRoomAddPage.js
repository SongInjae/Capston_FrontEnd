import styled, { css } from 'styled-components';

import Button from '../../components/Button';
import BackImage from '../../components/BackImage';
import PictureIcon from '../../assets/img/photo.png';

const FormStyled = styled.form`
  position: absolute;
  top: 3.5rem;
  left: 16.25rem;
  z-index: 1;
  width: 60rem;
  height: 40rem;
  margin: 3rem 7rem;
`;
const ImageBlock = styled.div`
  margin: 0 auto;
  width: 16.5rem;
  height: 12rem;
  background-color: #e6e9ec;
  border: 1px solid #5f6d7e;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageIcon = styled.div`
  background-image: url(${PictureIcon});
  width: 4em;
  height: 4em;
  background-size: contain;
  background-repeat: no-repeat;
`;
const FormBlock = styled.div`
  width: 60vw;
  height: 4rem;
  font-family: 'InterBold';
  font-weight: 400;
`;
const NameBlock = styled.div`
  width: 100%;
  height: 1.5rem;
`;
const InputBlock = styled.input`
  width: 100%;
  height: 1.7rem;
  border: 1px solid gray;
  border-radius: 0.25rem;
  padding-left: 0.2rem;
  background-color: white;

  ${(props) =>
    props.long &&
    css`
      height: 12rem;
    `}
`;
const SubmitButton = styled(Button)`
  width: 5.5rem;
  height: 2.2rem;
  margin-top: 10rem;
  text-align: center;
  font-size: 0.9rem !important;
`;

const MeetingRoomAddPage = () => {
  return (
    <>
      <BackImage />
      <FormStyled>
        <ImageBlock>
          <ImageIcon />
        </ImageBlock>
        <FormBlock>
          <NameBlock>회의실 이름</NameBlock>
          <InputBlock type="text" placeholder="ex) 대양AI센터 835호" />
        </FormBlock>
        <FormBlock>
          <NameBlock>편의시설</NameBlock>
          <InputBlock type="text" placeholder="ex) 빔프로젝트, 컴퓨터 2대" />
        </FormBlock>
        <FormBlock>
          <NameBlock>유의사항</NameBlock>
          <InputBlock
            long={true}
            type="text"
            placeholder="유의사항을 입력하세요."
          />
        </FormBlock>
        <SubmitButton>Submit</SubmitButton>
      </FormStyled>
    </>
  );
};

export default MeetingRoomAddPage;
