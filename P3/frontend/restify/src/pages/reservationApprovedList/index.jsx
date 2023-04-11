import ReservationApprovedList from "../../components/ReservationApproved";
import { ReservationContext, useReservationContext } from "../../contexts/ReservationContext";

const ReservationAppr = () => {
  return (
    <main>
      <ReservationContext.Provider value={useReservationContext()}>
        <ReservationApprovedList />
      </ReservationContext.Provider>
    </main>
  );
};

export default ReservationAppr;
