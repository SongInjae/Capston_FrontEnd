import React, { useState } from 'react';
import './MainPage.css';
import styled from 'styled-components';
import { Route, Routes, Link } from 'react-router-dom';

import MemberManagementsPage from './MemberManagementsPage';
import ReservationPage from './ReservationPage';
import MeetingRoomPage from './MeetingRoomPage';
import RegularReservagionPage from './RegularReservagionPage';
import ImprovementPage from './ImprovementPage';

import LogoutModal from '../components/AskModal';
import AddMember from './Member/AddMember';
import MeetingRoomAddPage from './MeetingRoom/MeetingRoomAddPage';

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
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li>
              <div className="img1" />
              <StyledLink to="/member">회원관리</StyledLink>
            </li>
            <li>
              <div className="img2" />
              <StyledLink to="/reserve">예약 확인</StyledLink>
            </li>
            <li>
              <div className="img3" />
              <StyledLink to="/room">회의실 관리</StyledLink>
            </li>
            <li>
              <div className="img4" />
              <StyledLink to="/regular">정기 예약자 관리</StyledLink>
            </li>
            <li>
              <div className="img5" />
              <StyledLink to="/improve">이용 환경 개선</StyledLink>
            </li>
          </ul>
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
          />
        </div>
        <div className="content-content">
          <Routes>
            <Route path="/member">
              <Route index element={<MemberManagementsPage />} />
              <Route path="add" element={<AddMember />} />
            </Route>
            <Route path="/reserve" element={<ReservationPage />} />
            <Route path="/room">
              <Route index element={<MeetingRoomPage />} />
              <Route path="add" element={<MeetingRoomAddPage />} />
            </Route>
            <Route path="/regular" element={<RegularReservagionPage />} />
            <Route path="/improve" element={<ImprovementPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
