import ReservationGuestList from "../../components/ReservationGuest";
import {
  ReservationContext,
  useReservationContext,
} from "../../contexts/ReservationContext";

const ReservationGuest = () => {
  return (
    <main>
      <ReservationContext.Provider value={useReservationContext()}>
        <ReservationGuestList />
      </ReservationContext.Provider>
    </main>
  );
};

export default ReservationGuest;
