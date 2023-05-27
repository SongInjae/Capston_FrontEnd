import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import logo from '../../img/sejong.png';

//헤더
const Header = styled.header`
  margin: 0 auto;
  display: flex;
  background-color: #a31432;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;
const MainTitle = styled.div`
  color: white;
  font-weight: bold;
  font-size: 26px;
  margin-left: 130px;
  display: flex;
  align-items: center;
`;
const SejongLogo = styled.img`
  width: 40px;
  height: 40px;
`;
const RightComponent = styled.div`
  text-align: right;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-right: 130px;
`;
const LogoutWrapper = styled.div``;
const UserInfo = styled.div`
  display: inline-block;
  color: white;
  font-weight: 600;
  font-size: 12px;
`;
const LogoutBtn = styled.button`
  display: inline-block;
  color: white;
  border: 1px solid #a31432;
  border-color: white;
  border-radius: 8px;
  background-color: #a31432;
  font-weight: 600;
  font-size: 12px;
  margin-left: 10px;
  margin-right: 15px;
  margin-bottom: 15px;
`;
const TabWrapper = styled.div``;
const HeaderTab = styled.li`
  display: inline-block;
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin-left: 15px;
  margin-right: 15px;
`;

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
      <Header>
        <MainTitle>
          <SejongLogo src={logo}></SejongLogo> &nbsp;세종대학교 예약시스템
        </MainTitle>
        <RightComponent>
          <LogoutWrapper>
            <UserInfo>17011582 권형석</UserInfo>
            <LogoutBtn>로그아웃</LogoutBtn>
          </LogoutWrapper>
          <TabWrapper>
            <HeaderTab>공지사항</HeaderTab>
            <HeaderTab>내 예약현황 조회</HeaderTab>
            <HeaderTab>마이페이지</HeaderTab>
          </TabWrapper>
        </RightComponent>
      </Header>

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
              {info.start.replace('T', ' ').substring(0, 16)}
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
