import ReservationExpiredList from "../../components/ReservationExpired";
import ReservationList from "../../components/ReservationExpired";
import {
  ReservationContext,
  useReservationContext,
} from "../../contexts/ReservationContext";

const ReservationExpi = () => {
  return (
    <main>
      <ReservationContext.Provider value={useReservationContext()}>
        <ReservationExpiredList />
      </ReservationContext.Provider>
    </main>
  );
};

export default ReservationExpi;
