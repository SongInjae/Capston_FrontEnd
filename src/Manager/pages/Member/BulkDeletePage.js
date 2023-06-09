import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import BackImage from '../../components/BackImage';
import Button from '../../components/Button';
import { changeField, bulkDelete } from '../../store/modules/addmember';

const ContentStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  flex: 1;
  margin: 3.5rem 16.25rem;
  z-index: 1000;
`;

const Box = styled.div`
  background: rgba(81, 98, 111, 0.8);
  padding: 1rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  margin-top: 5rem;
  margin-left: 15rem;
  color: white;
`;
const TextBoxBlock = styled.div`
  display: flex;
  text-align: center;
  margin-top: 0.5rem;
`;
const FormStyled = styled.form``;
const LabelBlock = styled.label`
  height: 1.5rem;
  display: block;
`;
const TextAreaStyled = styled.textarea`
  display: block;
  border: 1px solid gray;
  border-radius: 0.25rem;
  padding-left: 0.2rem;
  padding-top: 0.1rem;
`;
const ExampleBlock = styled.div`
  margin-left: 1rem;
`;
const GuideLineBlock = styled.div`
  display: block;
  font-weight: bold;
`;
const UlStyled = styled.ul`
  font-weight: 400;
`;
const ButtonSytled = styled(Button)`
  position: relative;
  top: 7rem;
  left: 11rem;
  width: 5rem;
  height: 2rem;
`;

const BulkDeletePage = () => {
  const { id } = useSelector(({ addmembers }) => ({
    id: addmembers.id,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { value, id } = e.target;
    dispatch(
      changeField({
        key: id,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(bulkDelete(id));
    navigate(-1);
  };
  return (
    <>
      <BackImage />
      <ContentStyled>
        <Box>
          <h1>회원정보 삭제</h1>
          <TextBoxBlock>
            <FormStyled onSubmit={onSubmit}>
              <LabelBlock htmlFor="id">&lt;입력&gt;</LabelBlock>
              <TextAreaStyled
                id="id"
                rows={20}
                cols={40}
                placeholder="삭제할 학번을 입력하세요."
                onChange={onChange}
                required
              />
              <ButtonSytled>Submit</ButtonSytled>
            </FormStyled>
            <ExampleBlock>
              <LabelBlock htmlFor="Exid">&lt;예시&gt;</LabelBlock>
              <TextAreaStyled
                id="id"
                rows={20}
                cols={40}
                placeholder="삭제할 학번을 입력하세요."
                readOnly
                value={
                  '11111111\n11111112\n11111113\n11111114\n11111115\n11111116'
                }
              />
            </ExampleBlock>
          </TextBoxBlock>
        </Box>
      </ContentStyled>
    </>
  );
};

export default BulkDeletePage;
