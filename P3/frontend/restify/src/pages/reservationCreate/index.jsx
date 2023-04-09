import ReservationCreate from "../../components/ReservationCreate";
import { ReservationContext, useReservationContext } from "../../contexts/ReservationContext";

const ReservationCre = () => {
    return (
        <main>
            <ReservationContext.Provider value={useReservationContext()}>
                <ReservationCreate />
            </ReservationContext.Provider>
        </main>
    );
}

export default ReservationCre;