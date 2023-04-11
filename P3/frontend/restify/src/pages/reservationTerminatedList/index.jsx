import ReservationTerminatedList from "../../components/ReservationTerminated";
import ReservationList from "../../components/ReservationTerminated";
import {
  ReservationContext,
  useReservationContext,
} from "../../contexts/ReservationContext";

const ReservationTerm = () => {
  return (
    <main>
      <ReservationContext.Provider value={useReservationContext()}>
        <ReservationTerminatedList />
      </ReservationContext.Provider>
    </main>
  );
};

export default ReservationTerm;
