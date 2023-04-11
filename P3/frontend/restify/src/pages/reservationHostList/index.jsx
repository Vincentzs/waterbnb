import ReservationHostList from "../../components/ReservationHost";
import { ReservationContext, useReservationContext } from "../../contexts/ReservationContext";

const ReservationHos = () => {
    return (
        <main>
            <ReservationContext.Provider value={useReservationContext()}>
                <ReservationHostList />
            </ReservationContext.Provider>
        </main>
    );
}

export default ReservationHos;