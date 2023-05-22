import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';

import BackImage from '../../components/BackImage';
import Button from '../../components/Button';

const FormStyled = styled.form`
  position: absolute;
  top: 3.5rem;
  left: 16.25rem;
  width: 65vw;
  height: 40rem;
  background-color: white;
  margin: 3rem 7rem;
  border-radius: 0.25rem;
  z-index: 1000;
  text-align: center;
`;

const FormBlock = styled.div`
  display: flex;
  width: 60vw;
  height: 4rem;
  font-family: 'InterBold';
  font-weight: 400;
  margin-top: 1rem;
`;
const LabelBlock = styled.label`
  width: 10%;
  height: 1.5rem;
`;
const InputBlock = styled.input`
  width: 90%;
  border-radius: 0.25rem;
  padding-left: 0.2rem;
  border: 1px solid gray;

  font-size: 1rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid gray;
  margin-bottom: 2rem;
`;
const QuillWrapper = styled.div`
  text-align: start;
  background-color: white;
  z-index: 10;
  .ql-editor {
    padding: 0;
    min-height: 50vh;
    max-height: 50vh;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor .ql-blank::before {
    left: 0px;
  }
`;
const SubmitButton = styled(Button)`
  width: 5rem;
  height: 2rem;
  margin-top: 1rem;
`;

const NotifyCorrect = ({ notify, onChange, onSubmit, onChangeField }) => {
  let id = notify.id;
  let [title, setTitle] = useState(notify.title);
  let [content, setContent] = useState(notify.content);
  useEffect(() => {
    onChange('id', id);
  }, [onChange, id]);

  useEffect(() => {
    onChange('title', title);
  }, [onChange, title]);
  useEffect(() => {
    onChange('content', content);
  }, [onChange, content]);

  const onUpdateTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const onChangeHtml = (e) => {
    setContent(e);
    onChangeField({ key: 'content', value: e });
  };
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
            onChange={onUpdateTitle}
            value={title}
            required
          />
        </FormBlock>
        <QuillWrapper>
          <ReactQuill onChange={onChangeHtml} value={content} required />
        </QuillWrapper>
        <SubmitButton>Submit</SubmitButton>
      </FormStyled>
    </>
  );
};

export default NotifyCorrect;
