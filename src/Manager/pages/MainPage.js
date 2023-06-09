import { useState } from 'react';
import './MainPage.css';
import styled from 'styled-components';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cookie from 'react-cookies';
import { logout } from '../../User/store/modules/auth';

import MemberManagementsPage from './MemberManagementsPage';
import ReservationPage from './ReservationPage';
import MeetingRoomPage from './MeetingRoomPage';
import RegularReservagionPage from './RegularReservagionPage';
import ImprovementPage from './ImprovementPage';

import LogoutModal from '../components/AskModal';
import BulkDeletePage from './Member/BulkDeletePage';
import CorrectForm from '../store/CorrectForm';
import InfoForm from '../store/InfoForm';
import RoomAddForm from '../store/RoomAddForm';
import RoomCorrectForm from '../store/RoomCorrectForm';
import NotifyAddForm from '../store/NotifyAddForm';
import NotifyCorrectForm from '../store/NotifyCorrectForm';

const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  color: #fff;
  padding: 1rem;
  text-decoration: none;
  font-size: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  border-radius: 4px;
  display: flex;
  margin-bottom: 0.6rem;
`;

const MainPage = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  let [btnActive, setBtnActive] = useState(0);
  const menus = [
    { id: 1, text: '회원관리', img: 1, address: '/admin/member' },
    { id: 2, text: '예약확인', img: 2, address: '/admin/reserve' },
    { id: 3, text: '회의실 관리', img: 3, address: '/admin/room' },
    { id: 4, text: '정기예약자 관리', img: 4, address: '/admin/regular' },
    { id: 5, text: '이용환경 개선', img: 5, address: '/admin/improve' },
  ];
  const navigate = useNavigate();

  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    dispatch(logout());
    navigate('/');
    localStorage.removeItem('user');
    cookie.remove('token');
  };

  const toggleActive = (e) => {
    setBtnActive(e.target.parentNode.value);
  };

  const menuList = menus.map((menu, idx) => (
    <li
      key={menu.id}
      value={idx}
      className={parseInt(idx) === parseInt(btnActive) ? 'active' : ''}
      onClick={toggleActive}
    >
      <div className={'img' + menu.img} />
      <StyledLink to={menu.address}>{menu.text}</StyledLink>
    </li>
  ));

  return (
    <div className="container">
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul>{menuList}</ul>
        </nav>
        <div className="sidebar-header" />
      </div>
      <div className="content">
        <div className="content-header">
          <div className="exit" onClick={onRemoveClick} />
          <LogoutModal
            visible={modal}
            onConfirm={onConfirm}
            onCancel={onCancel}
            title="로그아웃"
            description="정말로 로그아웃을 하시겠습니까?"
          />
        </div>
        <div className="content-content">
          <Routes>
            <Route path="/" element={<MemberManagementsPage />} />
            <Route path="/member">
              <Route index element={<MemberManagementsPage />} />
              <Route path="add" element={<InfoForm />} />
              <Route path="delete" element={<BulkDeletePage />} />
              <Route path="correct/:id" element={<CorrectForm />} />
            </Route>
            <Route path="/reserve" element={<ReservationPage />} />
            <Route path="/room">
              <Route index element={<MeetingRoomPage />} />
              <Route path="add" element={<RoomAddForm />} />
              <Route path="correct/:id" element={<RoomCorrectForm />} />
            </Route>
            <Route path="/regular" element={<RegularReservagionPage />} />
            <Route path="/improve">
              <Route index element={<ImprovementPage />} />
              <Route path="notify">
                <Route path="add" element={<NotifyAddForm />} />
                <Route path="correct/:id" element={<NotifyCorrectForm />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
/*
            <li>
              <div className="img1" />
              <StyledLink to="/admin/member">회원관리</StyledLink>
            </li>
            <li>
              <div className="img2" />
              <StyledLink to="/admin/reserve">예약 확인</StyledLink>
            </li>
            <li>
              <div className="img3" />
              <StyledLink to="/admin/room">회의실 관리</StyledLink>
            </li>
            <li>
              <div className="img4" />
              <StyledLink to="/admin/regular">정기 예약자 관리</StyledLink>
            </li>
            <li>
              <div className="img5" />
              <StyledLink to="/admin/improve">이용 환경 개선</StyledLink>
            </li>
            const [names, setNames] = useState([
              {id: ??, text: ??},
              {??}
            ]);
*/
