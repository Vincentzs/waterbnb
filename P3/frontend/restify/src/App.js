import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notification from "./pages/notification";
import PropertySearch from "./pages/property/PropertySearch";
import PropertyDetail from "./pages/property/PropertyDetail";
import PropertyCreate from "./pages/property/PropertyCreate";
import ImageUploader from "./pages/property/ImageUploader";
import PropertyUpdate from "./pages/property/PropertyUpdate";
import ReservationApp from "./pages/reservationApprove";
import ReservationCre from "./pages/reservationCreate";
import ReservationCom from "./pages/reservationComplete";
import ReservationCan from "./pages/resercationCancel";
import Login from "./components/login";
import ReservationHos from './pages/reservationHostList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="user/login" element={<Login />} />
          <Route path="notification" element={<Notification />} />
          <Route path="reservation/create" element={<ReservationCre />} />
          <Route path='reservation/hostlist' element={<ReservationHos />} />
          {/* <Route path='reservation/guestlist' element={<ReservationHos />} /> */}
          <Route path="reservation/:resid/approve" element={<ReservationApp />} />
          <Route path="reservation/:resid/complete" element={<ReservationCom />} />
          <Route path="reservation/:resid/cancel" element={<ReservationCan />} />
          <Route path="property-search" element={<PropertySearch />} />
          <Route path="property-detail/:propertyId" element={<PropertyDetail />} />
          <Route path="property-create" element={<PropertyCreate />} />
          <Route path="image-uploader" element={<ImageUploader />} />
          <Route path="property-update/:propertyId" element={<PropertyUpdate />} />
        </Route >
      </Routes >
    </BrowserRouter >
  );
}

export default App;
