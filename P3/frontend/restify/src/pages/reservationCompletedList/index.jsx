import ReservationCompletedList from "../../components/ReservationCompleted";
import {
  ReservationContext,
  useReservationContext,
} from "../../contexts/ReservationContext";

const ReservationComp = () => {
  return (
    <main>
      <ReservationContext.Provider value={useReservationContext()}>
        <ReservationCompletedList />
      </ReservationContext.Provider>
    </main>
  );
};

export default ReservationComp;
