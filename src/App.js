import { Routes, Route } from 'react-router-dom';
import SignIn from './User/client_container/signIn';
import MainPage from './Manager/pages/MainPage';

import UserMain from './User/client_container/main';
import ReservingPage from './User/client_container/reservation';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/admin/*" element={<MainPage />} />
      <Route path="/main" element={<UserMain />} />
      <Route path="/reserve" element={<ReservingPage />} />
    </Routes>
  );
};

export default App;
