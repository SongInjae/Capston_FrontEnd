import styled, { css } from 'styled-components';
import { useState, useEffect, useCallback } from 'react';

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
const ImageBlock = styled.label`
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
  ${(props) =>
    props.image &&
    css`
      background-color: transparent;
      //border: none;
    `}
`;
const ImageInput = styled.input`
  display: none;
`;
const ImageIcon = styled.div`
  background-image: url(${PictureIcon});
  width: 4em;
  height: 4em;
  background-size: contain;
  background-repeat: no-repeat;
  ${(props) =>
    props.image &&
    css`
      background-image: url(${props.image});
      width: 100%;
      height: 100%;
    `}
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

const CorrectRoomPage = ({
  room,
  setFile,
  setNamea,
  setAmenitiesa,
  setDiscriptiona,
  onSubmit,
}) => {
  let [name, setName] = useState(room.name);
  let [amenities, setAmenities] = useState(room.amenities);
  let [discription, setDiscription] = useState(room.discription);
  let [images, setImages] = useState(room.images.image);

  const saveImgFile = (e) => {
    const files = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onloadend = () => {
      setImages(reader.result);
    };
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    setNamea(name);
    setAmenitiesa(amenities);
    setDiscriptiona(discription);
  }, []);

  const onUpdateName = useCallback((e) => {
    setName(e.target.value);
    setNamea(e.target.value);
  }, []);
  const onUpdateAmenities = useCallback((e) => {
    setAmenities(e.target.value);
    setAmenitiesa(e.target.value);
  }, []);
  const onUpdateDiscription = useCallback((e) => {
    setDiscription(e.target.value);
    setDiscriptiona(e.target.value);
  }, []);

  return (
    <>
      <BackImage />
      <FormStyled onSubmit={onSubmit}>
        <ImageBlock htmlFor="images" image={images}>
          <ImageIcon image={images} />
        </ImageBlock>
        <ImageInput
          type="file"
          id="images"
          accept="image/*"
          onChange={saveImgFile}
        />
        <FormBlock>
          <LabelBlock htmlFor="room_name">회의실 이름</LabelBlock>
          <InputBlock
            type="text"
            placeholder="ex) 대양AI센터 835호"
            id="name"
            onChange={onUpdateName}
            value={name}
            required
          />
        </FormBlock>
        <FormBlock>
          <LabelBlock htmlFor="facility">편의시설</LabelBlock>
          <InputBlock
            type="text"
            placeholder="ex) 빔프로젝트, 컴퓨터 2대"
            id="amenities"
            onChange={onUpdateAmenities}
            value={amenities}
            required
          />
        </FormBlock>
        <FormBlock>
          <LabelBlock htmlFor="text">유의사항</LabelBlock>
          <TextareaBlock
            rows="8"
            placeholder="유의사항을 입력하세요."
            id="discription"
            onChange={onUpdateDiscription}
            value={discription}
            required
          />
        </FormBlock>
        <SubmitButton>Correct</SubmitButton>
      </FormStyled>
    </>
  );
};

export default CorrectRoomPage;
