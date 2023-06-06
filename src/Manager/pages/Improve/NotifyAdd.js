import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

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
const TitleInput = styled.input`
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
  padding: 1rem;
  .ql-editor {
    padding: 1rem;
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

const NotifyAdd = ({ onChange, onSubmit, onChangeField }) => {
  const onChangeHtml = (e) => {
    onChangeField({ key: 'content', value: e });
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }, 'link'],
        [
          {
            color: [
              '#000000',
              '#e60000',
              '#ff9900',
              '#ffff00',
              '#008a00',
              '#0066cc',
              '#9933ff',
              '#ffffff',
              '#facccc',
              '#ffebcc',
              '#ffffcc',
              '#cce8cc',
              '#cce0f5',
              '#ebd6ff',
              '#bbbbbb',
              '#f06666',
              '#ffc266',
              '#ffff66',
              '#66b966',
              '#66a3e0',
              '#c285ff',
              '#888888',
              '#a10000',
              '#b26b00',
              '#b2b200',
              '#006100',
              '#0047b2',
              '#6b24b2',
              '#444444',
              '#5c0000',
              '#663d00',
              '#666600',
              '#003700',
              '#002966',
              '#3d1466',
              'custom-color',
            ],
          },
          { background: [] },
        ],
        ['clean'],
      ],
    },
  };
  return (
    <>
      <BackImage />
      <FormStyled onSubmit={onSubmit}>
        <FormBlock>
          <LabelBlock htmlFor="title">제목</LabelBlock>
          <TitleInput
            type="text"
            placeholder="제목을 입력하세요."
            id="title"
            onChange={onChange}
            required
          />
        </FormBlock>
        <QuillWrapper>
          <ReactQuill onChange={onChangeHtml} modules={modules} />
        </QuillWrapper>
        <SubmitButton>Submit</SubmitButton>
      </FormStyled>
    </>
  );
};

export default NotifyAdd;

/*
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
        */
