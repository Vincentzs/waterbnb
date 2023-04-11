import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notification from "./pages/notification";
import PropertySearch from "./pages/property/PropertySearch";
import PropertyDetail from "./pages/property/PropertyDetail";
import PropertyCreate from "./pages/property/PropertyCreate";
import ImageUploader from "./pages/property/ImageUploader";
import PropertyUpdate from "./pages/property/PropertyUpdate";
import UserProperties from "./pages/property/UserProperties";

import ReservationApp from "./pages/reservationApprove";
import ReservationCre from "./pages/reservationCreate";
import ReservationCom from "./pages/reservationComplete";
import ReservationCan from "./pages/resercationCancel";
import Login from "./components/login";
import ReservationHost from "./pages/reservationHostList";
import ReservationGuest from "./pages/reservationGuestList";
import ReservationList from "./pages/property/reservationlist";
import ReservationTerminatedList from "./components/ReservationTerminated";
import ReservationPend from "./pages/reservationPendingList";
import ReservationAppr from "./pages/reservationApprovedList";
import ReservationComp from "./pages/reservationCompletedList";
import ReservationCancel from "./pages/reservationCanceledList";
import ReservationDeni from "./pages/reservationDeniedList";
import ReservationExpi from "./pages/reservationExpiredList";
import ReservationTerm from "./pages/reservationTerminatedList";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="user/login" element={<Login />} />
          <Route path="notification" element={<Notification />} />
          <Route path="reservation/create" element={<ReservationCre />} />

          <Route path="reservationlist" element={<ReservationList />} />

          <Route path="reservation/hostlist" element={<ReservationHost />} />
          <Route path="reservation/guestlist" element={<ReservationGuest />} />
          <Route path="reservation/pendinglist" element={<ReservationPend />} />
          <Route path="reservation/approvedlist" element={<ReservationAppr />} />
          <Route path="reservation/completedlist" element={<ReservationComp />} />
          <Route path="reservation/canceledlist" element={<ReservationCancel />} />
          <Route path="reservation/deniedlist" element={<ReservationDeni />} />
          <Route path="reservation/expiredlist" element={<ReservationExpi />} />
          <Route path="reservation/terminatedlist" element={<ReservationTerm />} />

          <Route path="reservation/:resid/approve" element={<ReservationApp />} />
          <Route path="reservation/:resid/complete" element={<ReservationCom />} />
          <Route path="reservation/:resid/cancel" element={<ReservationCan />} />
          <Route path="property-search" element={<PropertySearch />} />
          <Route
            path="property-detail/:propertyId"
            element={<PropertyDetail />}
          />
          <Route path="property-create" element={<PropertyCreate />} />
          <Route path="image-uploader" element={<ImageUploader />} />
          <Route
            path="property-update/:propertyId"
            element={<PropertyUpdate />}
          />
          <Route path="user-properties" element={<UserProperties />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
