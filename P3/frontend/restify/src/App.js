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
import ReservationApprovedList from "./components/ReservationApproved";
import ReservationCompletedList from "./components/ReservationCompleted";
import ReservationCanceledList from "./components/ReservationCanceled";
import ReservationPendingList from "./components/ReservationPending";
import ReservationDeniedList from "./components/ReservationDenied";
import ReservationExpiredList from "./components/ReservationExpired";
import ReservationTerminatedList from "./components/ReservationTerminated";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="user/login" element={<Login />} />
          <Route path="notification" element={<Notification />} />
          <Route path="reservation/create" element={<ReservationCre />} />
          <Route path="reservation/hostlist" element={<ReservationHost />} />
          <Route path="reservation/guestlist" element={<ReservationGuest />} />
          <Route
            path="reservation/approvedlist"
            element={<ReservationApprovedList />}
          />
          <Route
            path="reservation/completedlist"
            element={<ReservationCompletedList />}
          />
          <Route
            path="reservation/canceledlist"
            element={<ReservationCanceledList />}
          />
          <Route
            path="reservation/pendinglist"
            element={<ReservationPendingList />}
          />
          <Route
            path="reservation/deniedlist"
            element={<ReservationDeniedList />}
          />
          <Route
            path="reservation/expiredlist"
            element={<ReservationExpiredList />}
          />
          <Route
            path="reservation/terminatedlist"
            element={<ReservationTerminatedList />}
          />

          <Route
            path="reservation/:resid/approve"
            element={<ReservationApp />}
          />
          <Route
            path="reservation/:resid/complete"
            element={<ReservationCom />}
          />
          <Route
            path="reservation/:resid/cancel"
            element={<ReservationCan />}
          />
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
          <Route path="reservation-list" element={<ReservationList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
