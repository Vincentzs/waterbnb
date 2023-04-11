import ReservationDeniedList from "../../components/ReservationDenied";
import {
  ReservationContext,
  useReservationContext,
} from "../../contexts/ReservationContext";

const ReservationDeni = () => {
  return (
    <main>
      <ReservationContext.Provider value={useReservationContext()}>
        <ReservationDeniedList />
      </ReservationContext.Provider>
    </main>
  );
};

export default ReservationDeni;
