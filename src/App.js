import { Routes, Route } from 'react-router-dom';
import SignIn from './User/client_container/signIn';
import MainPage from './Manager/pages/MainPage';

import UserMain from './User/client_container/main';
import ReservingPage from './User/client_container/reservation';
import MyReservation from './User/client_container/myReservation';
<<<<<<< HEAD
import NoticePage from './User/client_container/notice';
=======
import NotifyInfoPage from './User/client_container/Notify/NotifyInfoPage';
import NotifyMainPage from './User/client_container/Notify/NotifyMainPage';
>>>>>>> ff2dcd851225751d402a504dc0d630dca8efab61

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/admin/*" element={<MainPage />} />

      <Route path="/main" element={<UserMain />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/reserve" element={<ReservingPage />} />
      <Route path="/main/*" element={<UserMain />} />
      <Route path="/main/reserve" element={<MyReservation />} />
      <Route path="/main/board">
        <Route index element={<NotifyMainPage />} />
        <Route path=":id" element={<NotifyInfoPage />} />
      </Route>
    </Routes>
  );
};

export default App;
