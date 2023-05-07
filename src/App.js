import { Routes, Route } from 'react-router-dom';
import SignIn from './User/client_container/signIn';
import MainPage from './Manager/pages/MainPage';

import UserMain from './User/client_container/main';
import ReservingPage from './User/client_container/reservation';
import MyReservation from './User/client_container/myReservation';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/admin/*" element={<MainPage />} />

      <Route path="/main" element={<UserMain />} />
      <Route path="/reserve" element={<ReservingPage />} />
      <Route path="/main/*" element={<UserMain />} />
      <Route path="/main/reserve" element={<MyReservation />} />
    </Routes>
  );
};

export default App;
