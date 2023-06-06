import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../component/header';

//헤더


//본문
const ContentBlock = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const ContentTitle = styled.div`
  margin-top: 1.5rem;
  border-left: 0.25rem solid rgb(195, 0, 47);
  padding-left: 0.25rem;
  font-weight: 700;
`;
const BoardInfo = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
`;
const SpanStyld = styled.span`
  ${(props) =>
    props.bold &&
    css`
      font-weight: 600;
    `}
  ${(props) =>
    props.margin &&
    css`
      margin-right: 1rem;
    `}
`;
const BoardTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  border-top: 2px solid rgb(195, 0, 47);
  padding: 1.5rem 1rem;
  overflow: scroll;
`;
const BoardContent = styled.div`
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 2rem 1rem;
  min-height: 30rem;
`;
const ButtonStyled = styled.div`
  background-color: rgb(195, 0, 47);
  border-radius: 0.25rem;
  float: right;
  padding: 0.5rem 1rem;
  color: white;
  margin-top: 1rem;
  cursor: pointer;
`;

const NotifyInfoPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const paramsId = parseInt(params.id);

  const { infos } = useSelector(({ board }) => ({ infos: board.infos }));
  let info = null;
  for (let i = 0; i <= infos.length; i++) {
    if (infos[i].id === paramsId) {
      info = infos[i];
      break;
    }
  }

  return (
    <div>
      <Header></Header>
      <ContentBlock>
        <ContentTitle>공지사항</ContentTitle>
        <BoardInfo>
          <span>
            글번호_
            <SpanStyld bold={true} margin={true}>
              {info.id}
            </SpanStyld>
          </span>
          <span>
            등록일_
            <SpanStyld bold={true}>
              {info.end.replace('T', ' ').substring(0, 16)}
            </SpanStyld>
          </span>
        </BoardInfo>
        <BoardTitle>{info.title}</BoardTitle>
        <BoardContent dangerouslySetInnerHTML={{ __html: info.content }} />
        <ButtonStyled onClick={() => navigate(-1)}>목록</ButtonStyled>
      </ContentBlock>
    </div>
  );
};

export default NotifyInfoPage;
