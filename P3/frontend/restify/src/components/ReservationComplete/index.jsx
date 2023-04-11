import { useContext, useEffect } from "react";
import { ReservationContext } from "../../contexts/ReservationContext";
import { useParams } from "react-router-dom"
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import ReservationDetails from "../ReservationDetail";
import PopModal from "../PopupModal";

const ReservationComplete = () => {
    const { resid } = useParams();
    const { detail, setDetail, errorMes, seterrorMes, handleShow, isSameUser } = useContext(ReservationContext);

    useEffect(() => {
        setDetail('');
        // Using GET method to print the reservation detail for the host to review
        fetch(`http://localhost:8000/reservation/${resid}/completed/`, {
            mode: "cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage['jwt']}`
            },
        })
            .then((response) => {
                if (response.status === 401) {
                    window.location.href = "/user/login";
                }
                return response.json();
            })
            .then((data) => setDetail(data[0]));
    }, []);

    function waitForCond(variable) {
        function waitFor(result) {
            if (result !== undefined) {
                return result;
            }
            return new Promise((resolve) => setTimeout(resolve, 100))
                .then(() => Promise.resolve(window[variable]))
                .then((res) => waitFor(res));
        }
        return waitFor();
    }

    const handleComplete = async (event) => {
        event.preventDefault();
        handleShow();
        let user_selection = await waitForCond('popupagreed');
        if (user_selection) {
            seterrorMes("");
            const errors = [];
            const today = new Date().toISOString().slice(0, 10);

            // if (detail.check_out > today || detail.check_in > today) {
            //     errors.push("Error: Your reservation is not done.");
            // }

            if (detail.reservation_status !== 'approved') {
                errors.push('You cannot complete a reservation request unless host approves it.');
            }

            if (errors.length > 0) {
                seterrorMes(errors.join("\n"));
                return;
            }

            fetch(`http://localhost:8000/reservation/${resid}/completed/`, {
                mode: "cors",
                method: 'PATCH',
                body: JSON.stringify(detail),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${window.localStorage['jwt']}`

                }
            })
                .then(response => {
                    if (response.status === 200) {
                        alert("You complete the reservation successfully!")
                    } else {
                        alert("You fail to complete the reservation.")
                    }
                })
                .catch((error) => seterrorMes(error));
        }
        window.location.href = "/reservationlist";
    };

    return (
        <>
            <Container className=" my-5">
                {errorMes && <div className="text-center">{errorMes}</div>}
                <ReservationDetails details={detail} buttonText={'You can complet the reservation now.'} buttonClick={handleComplete} />
            </Container>
            <PopModal title={"Complete the reservation"} content={"Complete your resercation! Yay!!"} />
        </>

    );
};

export default ReservationComplete;