import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { take, takeType } from '../../store/modules/noshow';
import Loading from '../../components/Loading';
import UserIcon from '../../assets/img/Penaltiy_User.png';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const StyledBlock = styled.div`
  width: 70rem;
  height: 22rem;
  border: 1px solid #5f6d7c;
  border-radius: 0.25rem;
  padding: 1rem;
  position: relative;
`;
const TitleBlock = styled.div`
  font-family: 'InterBold';
  font-weight: 700;
  color: #5f6d7c;
  margin-bottom: 1.5rem;
`;
const ContentBlock = styled.div`
  display: flex;
  width: 100%;
  margin: 0.5rem 2rem;
  justify-content: space-around;
`;
const DoughnutStyled = styled(Doughnut)`
  width: 17rem !important;
  height: 17rem !important;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 1rem;
`;
const UserListBlock = styled.div`
  width: 50%;
  height: 17rem;
  overflow: scroll;
  border: 1px solid black;
  border-radius: 0.5rem;
`;
const UserCategory = styled.div`
  display: flex;
  background-color: rgb(209, 217, 226);
`;
const ButtonStyled = styled.div`
  color: rgb(81, 98, 111);
  padding: 1rem;
  &:hover {
    background-color: rgb(81, 98, 111);
    color: white;
    cursor: pointer;
  }
  &:last-child {
  }
`;
const UserBlock = styled.div`
  display: flex;
  height: 6rem;
  width: 30rem;
  padding: 0 1rem;
  border-bottom: 1px solid #5f6d7c;
  margin: 1rem;
  ${(props) =>
    props.last &&
    css`
      border: none;
    `}
`;
const ImageInfoBlock = styled.div`
  width: 24em;
  height: 6rem;
  display: flex;
`;
const ImageIcon = styled.div`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
  background-image: url(${UserIcon});
  background-size: contain;
  background-repeat: no-repeat;
`;
const TextBlock = styled.div`
  width: 16rem;
  height: 5rem;
`;
const InfoBlock = styled.div`
  font-weight: 300;
  color: #5f6d7c;

  ${(props) =>
    props.bold &&
    css`
      font-weight: 600;
    `}
`;

const Penalty = () => {
  const dispatch = useDispatch();
  const { loading_take, loading_takeType } = useSelector(({ loading }) => ({
    loading_take: loading['noshow/take'],
    loading_takeType: loading['noshow/takeType'],
  }));
  useEffect(() => {
    dispatch(takeType());
    dispatch(take());
  }, [dispatch]);
  const { infos, stateData } = useSelector(({ noshow }) => ({
    infos: noshow.infos,
    stateData: noshow.data,
  }));

  const [cnt1, setCnt1] = useState(0);
  const [cnt2, setCnt2] = useState(0);
  const [cnt3, setCnt3] = useState(0);

  useEffect(() => {
    console.log(stateData, stateData.length);
    for (let i = 0; i < stateData.length; i++) {
      if (stateData[i].user_type_name === '교수') setCnt1(stateData[i].noshow);
      else if (stateData[i].user_type_name === '대학원생')
        setCnt2(stateData[i].noshow);
      else if (stateData[i].user_type_name === '학부생')
        setCnt3(stateData[i].noshow);
    }
  }, [stateData]);

  const [filterInfo, setFilterInfo] = useState(infos);
  const [userType, setUserType] = useState('교수');
  const [infoListSet, setInfoList] = useState();

  useEffect(() => {
    setFilterInfo(
      infos.filter((info) => {
        return info.user_type_name === userType;
      }),
    );
  }, [infos, userType]);

  //패널티 회원 정보
  useEffect(() => {
    let InfoLists = [];
    for (let i = 0; i < filterInfo.length; i++) {
      InfoLists.push(
        <UserBlock key={filterInfo[i].id}>
          <ImageInfoBlock>
            <ImageIcon />
            <TextBlock>
              <InfoBlock bold={true}>
                {filterInfo[i].name}({filterInfo[i].user_no})
              </InfoBlock>
              <InfoBlock>{filterInfo[i].user_type_name}</InfoBlock>
              <InfoBlock>Panalty : {filterInfo[i].noshow}</InfoBlock>
              <InfoBlock>Email : {filterInfo[i].email}</InfoBlock>
            </TextBlock>
          </ImageInfoBlock>
        </UserBlock>,
      );
    }
    setInfoList(InfoLists);
  }, [filterInfo, filterInfo.length, infos]);

  //차트 데이터
  const data = {
    labels: ['교수', '대학원생', '학부생'],
    datasets: [
      {
        label: '노쇼 횟수',
        data: [cnt1, cnt2, cnt3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading_take || loading_takeType) {
    return <Loading />;
  }

  return (
    <StyledBlock>
      <TitleBlock>사용자별 노쇼 회원 목록</TitleBlock>
      <ContentBlock>
        <DoughnutStyled data={data} />
        <UserListBlock>
          <UserCategory>
            <ButtonStyled onClick={() => setUserType('교수')}>
              교직원
            </ButtonStyled>
            <ButtonStyled onClick={() => setUserType('대학원생')}>
              대학원생
            </ButtonStyled>
            <ButtonStyled onClick={() => setUserType('학부생')}>
              학부생
            </ButtonStyled>
          </UserCategory>
          {infoListSet}
        </UserListBlock>
      </ContentBlock>
    </StyledBlock>
  );
};

export default Penalty;
