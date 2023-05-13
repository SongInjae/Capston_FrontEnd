import styled from 'styled-components';

import BackImage from '../../components/BackImage';
import Button from '../../components/Button';

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
const LabelBlock = styled.label`
  width: 100%;
  height: 1.5rem;
`;
const InputBlock = styled.input`
  width: 100%;
  height: 1.7rem;
  border-radius: 0.25rem;
  padding-left: 0.2rem;
  border: 1px solid gray;
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
  width: 5rem;
  height: 2rem;
  margin-top: 1rem;
  margin: 8rem auto;
`;

const NotifyAdd = ({ onChange, onSubmit }) => {
  return (
    <>
      <BackImage />
      <FormStyled onSubmit={onSubmit}>
        <FormBlock>
          <LabelBlock htmlFor="title">제목</LabelBlock>
          <InputBlock
            type="text"
            placeholder="이름을 입력하세요."
            id="title"
            onChange={onChange}
            required
          />
        </FormBlock>
        <FormBlock>
          <LabelBlock htmlFor="text">내용</LabelBlock>
          <TextareaBlock
            rows="8"
            placeholder="내용을 입력하세요."
            id="text"
            onChange={onChange}
            required
          />
        </FormBlock>
        <SubmitButton>Submit</SubmitButton>
      </FormStyled>
    </>
  );
};

export default NotifyAdd;
