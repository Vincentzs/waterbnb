import ReservationPendingList from "../../components/ReservationPending";
import ReservationList from "../../components/ReservationPending";
import {
  ReservationContext,
  useReservationContext,
} from "../../contexts/ReservationContext";

const ReservationPend = () => {
  return (
    <main>
      <ReservationContext.Provider value={useReservationContext()}>
        <ReservationPendingList />
      </ReservationContext.Provider>
    </main>
  );
};

export default ReservationPend;
