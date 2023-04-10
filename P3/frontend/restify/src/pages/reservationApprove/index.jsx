import ReservationApprove from "../../components/ReservationApprove";
import { ReservationContext, useReservationContext } from "../../contexts/ReservationContext";

const ReservationApp = () => {
    return (
        <main>
            <ReservationContext.Provider value={useReservationContext()}>
                <ReservationApprove />
            </ReservationContext.Provider>
        </main>
    );
}

export default ReservationApp;