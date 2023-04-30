import styled from 'styled-components';

import Button from '../../components/Button';
import BackImage from '../../components/BackImage';
import PictureIcon from '../../assets/img/photo.png';

const FormStyled = styled.form`
  position: absolute;
  top: 3.5rem;
  left: 16.25rem;
  z-index: 1;
  width: 60vw;
  height: 40vh;
  margin: 3rem 10rem;
  flex: 1;
  display: table;
  vertical-align: middle;
`;
const ImageBlock = styled.div`
  display: table-cell;
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
  display: table-row;
  width: 60vw;
  height: 4rem;
  font-family: 'InterBold';
  font-weight: 400;
`;
const LabelBlock = styled.label`
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
`;
const TextareaBlock = styled.textarea`
  width: 100%;
  border: 1px solid gray;
  border-radius: 0.25rem;
  padding-left: 0.2rem;
  background-color: white;
  padding-top: 0.1rem;
`;
const SubmitButton = styled(Button)`
  display: table-row;
  width: 5.5rem;
  height: 2.2rem;
  margin-top: 1rem;
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
          <LabelBlock for="name">회의실 이름</LabelBlock>
          <InputBlock
            type="text"
            placeholder="ex) 대양AI센터 835호"
            id="name"
          />
        </FormBlock>
        <FormBlock>
          <LabelBlock for="facility">편의시설</LabelBlock>
          <InputBlock
            type="text"
            placeholder="ex) 빔프로젝트, 컴퓨터 2대"
            id="facility"
          />
        </FormBlock>
        <FormBlock>
          <LabelBlock for="consider">유의사항</LabelBlock>
          <TextareaBlock
            rows="8"
            placeholder="유의사항을 입력하세요."
            id="consider"
          />
        </FormBlock>
        <SubmitButton>Submit</SubmitButton>
      </FormStyled>
    </>
  );
};

export default MeetingRoomAddPage;
