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
import ReservationHost from "./pages/reservationHostList";
import ReservationGuest from "./pages/reservationGuestList";
import Reservation from "./pages/property/reservationlist";

import Login from "./components/Account/Login";
import Signup from "./components/Account/Signup";
import Profile from "./components/Account/Profile";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer/Footer";
// import Home from "./pages/Home";
import CommentList from "./components/Comment/CommentList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />}> */}
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
          <Route path="commentList" element={<CommentList />} />

          <Route path="notification" element={<Notification />} />
          <Route path="reservation/create" element={<ReservationCre />} />
          <Route path="reservationlist" element={<Reservation />} />
          <Route path="reservation/hostlist" element={<ReservationHost />} />
          <Route path="reservation/guestlist" element={<ReservationGuest />} />
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
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
