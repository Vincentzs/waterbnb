import ReservationComplete from "../../components/ReservationComplete";
import { ReservationContext, useReservationContext } from "../../contexts/ReservationContext";

const ReservationCom = () => {
    return (
        <main>
            <ReservationContext.Provider value={useReservationContext()}>
                <ReservationComplete />
            </ReservationContext.Provider>
        </main>
    );
}

export default ReservationCom;