import ReservationHostList from "../../components/ReservationHost";
import { ReservationContext, useReservationContext } from "../../contexts/ReservationContext";

const ReservationHost = () => {
    return (
        <main>
            <ReservationContext.Provider value={useReservationContext()}>
                <ReservationHostList />
            </ReservationContext.Provider>
        </main>
    );
}

export default ReservationHost;