import ReservationCancel from "../../components/ReservationCancel";
import { ReservationContext, useReservationContext } from "../../contexts/ReservationContext";

const ReservationCan = () => {
    return (
        <main>
            <ReservationContext.Provider value={useReservationContext()}>
                <ReservationCancel />
            </ReservationContext.Provider>
        </main>
    );
}

export default ReservationCan;