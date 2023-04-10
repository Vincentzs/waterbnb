import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Notification from './pages/notification';
import ReservationApp from './pages/reservationApprove';
import ReservationCre from './pages/reservationCreate';
import ReservationCom from './pages/reservationComplete';
import ReservationCan from './pages/resercationCancel';
import Login from './components/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path="user/login" element={<Login />} />
          <Route path="notification" element={<Notification />} />
          <Route path='reservation/create' element={<ReservationCre />} />
          <Route path='reservation/:resid/approve' element={<ReservationApp />} />
          <Route path='reservation/:resid/complete' element={<ReservationCom />} />
          <Route path='reservation/:resid/cancel' element={<ReservationCan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
