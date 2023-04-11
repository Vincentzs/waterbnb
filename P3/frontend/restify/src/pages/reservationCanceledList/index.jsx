import ReservationCanceledList from "../../components/ReservationCanceled";
import ReservationList from "../../components/ReservationCanceled";
import {
  ReservationContext,
  useReservationContext,
} from "../../contexts/ReservationContext";

const ReservationCancel = () => {
  return (
    <main>
      <ReservationContext.Provider value={useReservationContext()}>
        <ReservationCanceledList />
      </ReservationContext.Provider>
    </main>
  );
};

export default ReservationCancel;
