import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import SignIn from './User/client_container/signIn';
import MainPage from './Manager/pages/MainPage';

import UserMain from './User/client_container/main';
import ReservingPage from './User/client_container/reservation';
import MyReservation from './User/client_container/myReservation';

import NotifyInfoPage from './User/client_container/Notify/NotifyInfoPage';
import NotifyMainPage from './User/client_container/Notify/NotifyMainPage';

import ScheduleReservingPage from './User/client_container/scheduleReservePage';
import InconfidencePage from './User/client_container/inconvenience';

const App = () => {
  return (
    <>
      <Helmet>
        <title>Meet-up</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/admin/*" element={<MainPage />} />
        <Route path="/main" element={<UserMain />} />
        <Route path="/reserve" element={<ReservingPage />} />
        <Route path="/schedule_reserve" element={<ScheduleReservingPage />} />
        <Route path="/main/*" element={<UserMain />} />
        <Route path="/main/reserve" element={<MyReservation />} />
        <Route path="/main/inconfidence" element={<InconfidencePage />} />
        <Route path="/main/board">
          <Route index element={<NotifyMainPage />} />
          <Route path=":id" element={<NotifyInfoPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
