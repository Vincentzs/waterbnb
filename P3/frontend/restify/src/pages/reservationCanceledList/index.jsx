import ReservationList from "../../components/ReservationCanceled";
import {
  ReservationContext,
  useReservationContext,
} from "../../contexts/ReservationContext";

const ReservationHost = () => {
  return (
    <main>
      <ReservationContext.Provider value={useReservationContext()}>
        <ReservationList />
      </ReservationContext.Provider>
    </main>
  );
};

export default ReservationHost;
