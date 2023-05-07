import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';

import Button from '../../components/Button';
import BackImage from '../../components/BackImage';
import UserIcon from '../../assets/img/user.png';

const FormStyled = styled.form`
  position: absolute;
  top: 3.5rem;
  left: 16.25rem;
  width: 20rem;
  height: 50rem;
  margin: 3rem 27rem;
  opacity: 0.9;
  z-index: 1000;
`;
const FormBlock = styled.div`
  width: 100%;
  height: 4em;
  font-family: 'InterBold';
  font-weight: 400;
`;
const ImageIcon = styled.div`
  background-image: url(${UserIcon});
  width: 8rem;
  height: 8rem;
  margin: 0 auto;
`;
const LabelBlock = styled.label`
  width: 100%;
  height: 1.5rem;
`;
const NameInputBlock = styled.input`
  width: 100%;
  height: 1.7rem;
  border-radius: 0.25rem;
  padding-left: 0.2rem;
  border: 1px solid gray;
`;
const CheckBoxBlock = styled.div`
  width: 100%;
  height: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: left;
  background-color: white;
  border-radius: 4px;
  border: 1px solid gray;
  z-index: -1;
`;
const CheckBlock = styled.input`
  width: 1rem;
  height: 1rem;
  z-index: 1;
`;
const CheckNameBlock = styled.div`
  font-size: 0.8rem;
  color: gray;
`;
const SubmitButton = styled(Button)`
  width: 5rem;
  height: 2rem;
  margin-top: 1rem;
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddMember = ({ info, onChange, onSubmit }) => {
  let id = info.id;
  let [name, setName] = useState(info.name);
  let [number, setNumber] = useState(info.number);
  let [email, setEmail] = useState(info.email);
  let [design, setDesign] = useState(info.designation);
  useEffect(() => {
    onChange('id', id);
  }, [onChange, id]);
  useEffect(() => {
    onChange('name', name);
  }, [onChange, name]);
  useEffect(() => {
    onChange('number', number);
  }, [onChange, number]);
  useEffect(() => {
    onChange('email', email);
  }, [onChange, email]);
  useEffect(() => {
    onChange('designation', design);
  }, [onChange, design]);

  const onUpdateName = useCallback((e) => {
    setName(e.target.value);
  }, []);
  const onUpdateNumber = useCallback((e) => {
    setNumber(e.target.value);
  }, []);
  const onUpdateEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onUpdateDesign = useCallback((e) => {
    setDesign(e.target.value);
  }, []);

  return (
    <>
      <BackImage />
      <FormStyled onSubmit={onSubmit}>
        <ImageIcon />
        <FormBlock>
          <LabelBlock htmlFor="name">이름</LabelBlock>
          <NameInputBlock
            type="text"
            placeholder="이름을 입력하세요."
            name="name"
            onChange={onUpdateName}
            value={name}
            required
          />
        </FormBlock>
        <FormBlock>
          <LabelBlock htmlFor="number">학번 / 교번</LabelBlock>
          <NameInputBlock
            type="number"
            placeholder="학번 혹은 교번을 입력하세요."
            name="number"
            onChange={onUpdateNumber}
            value={number}
            required
          />
        </FormBlock>
        <FormBlock>
          <LabelBlock htmlFor="mail">이메일 주소</LabelBlock>
          <NameInputBlock
            type="email"
            placeholder="이메일 주소를 입력하세요."
            name="email"
            onChange={onUpdateEmail}
            value={email}
            required
          />
        </FormBlock>
        <FormBlock>
          <LabelBlock htmlFor="belong">소속</LabelBlock>
          <CheckBoxBlock>
            <CheckBlock
              type="radio"
              name="designation"
              onChange={onUpdateDesign}
              value="교수"
              checked={design === '교수' ? true : false}
            />
            <CheckNameBlock>교수</CheckNameBlock>
            <CheckBlock
              type="radio"
              name="designation"
              onChange={onUpdateDesign}
              value="조교"
              checked={design === '조교' ? true : false}
            />
            <CheckNameBlock>조교</CheckNameBlock>
            <CheckBlock
              type="radio"
              name="designation"
              onChange={onUpdateDesign}
              value="대학원생"
              checked={design === '대학원생' ? true : false}
            />
            <CheckNameBlock>대학원생</CheckNameBlock>
            <CheckBlock
              type="radio"
              name="designation"
              onChange={onUpdateDesign}
              value="학생"
              checked={design === '학생' ? true : false}
            />
            <CheckNameBlock>학생</CheckNameBlock>
          </CheckBoxBlock>
        </FormBlock>
        <SubmitButton>Correct</SubmitButton>
      </FormStyled>
    </>
  );
};

export default AddMember;
