import styled, { css } from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../../store/modules/noshow';

import Button from '../../components/Button';
import UserIcon from '../../assets/img/Penaltiy_User.png';
import LogoutModal from '../../components/LogoutModal';

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
  //border-right: 1px solid rgb(81, 98, 111);
  //border-bottom: 1px solid rgb(81, 98, 111);
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
const DeleteButton = styled(Button)`
  width: 5rem;
  height: 2.5rem;
  font-family: 'InterLight';
  font-size: 0.9rem;
  font-weight: 900;
  text-decoration: none;
  border-radius: 0.25rem;
  margin-top: 1rem;
  cursor: pointer;
  color: #5f6d73;
  background-color: rgb(209, 217, 226);
  &:hover {
    background-color: rgb(81, 98, 111);
    color: white;
  }
`;

const Penalty = () => {
  const { infos, stateData } = useSelector(({ noshow }) => ({
    infos: noshow.infos,
    stateData: noshow.data,
  }));
  const dispatch = useDispatch();
  const [cnt1, setCnt1] = useState(0);
  const [cnt2, setCnt2] = useState(0);
  const [cnt3, setCnt3] = useState(0);

  useEffect(() => {
    setCnt1(stateData[0]);
    setCnt2(stateData[1]);
    setCnt3(stateData[2]);
  }, [stateData]);

  //모달 구현
  const [id, setId] = useState();
  const [modal, setModal] = useState(false);
  const onRemoveClick = (infoId) => {
    setModal(true);
    setId(infoId);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = useCallback(() => {
    setModal(false);
    dispatch(remove(id));
  }, []);

  //패널티 회원 정보
  let InfoLists = [];
  for (let i = 0; i < infos.length; i++) {
    InfoLists.push(
      <UserBlock key={infos[i].id}>
        <ImageInfoBlock>
          <ImageIcon />
          <TextBlock>
            <InfoBlock bold={true}>
              {infos[i].name}({infos[i].number})
            </InfoBlock>
            <InfoBlock>{infos[i].designation}</InfoBlock>
            <InfoBlock>Panalty : {infos[i].count}</InfoBlock>
            <InfoBlock>Email : {infos[i].email}</InfoBlock>
          </TextBlock>
        </ImageInfoBlock>
        <DeleteButton onClick={() => onRemoveClick(infos[i].id)}>
          Delete
        </DeleteButton>
      </UserBlock>,
    );
  }

  //차트 데이터
  const data = {
    labels: ['교직원', '대학원생', '학부생'],
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

  return (
    <StyledBlock>
      <TitleBlock>사용자별 노쇼 회원 목록</TitleBlock>
      <ContentBlock>
        <DoughnutStyled data={data} />
        <UserListBlock>
          <UserCategory>
            <ButtonStyled>교직원</ButtonStyled>
            <ButtonStyled>대학원생</ButtonStyled>
            <ButtonStyled>학부생</ButtonStyled>
          </UserCategory>
          {InfoLists}
        </UserListBlock>
      </ContentBlock>
      <LogoutModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
        title="패널티 회원 삭제"
        description="정말로 삭제하시겠습니까?"
      />
    </StyledBlock>
  );
};

export default Penalty;
