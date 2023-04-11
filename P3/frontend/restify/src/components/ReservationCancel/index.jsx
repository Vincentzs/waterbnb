import { useContext, useEffect } from "react";
import { ReservationContext } from "../../contexts/ReservationContext";
import { useParams } from "react-router-dom"
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import ReservationDetails from "../ReservationDetail";
import PopModal from "../PopupModal";

const ReservationCancel = () => {
    const { resid } = useParams();
    const { detail, setDetail, errorMes, seterrorMes, handleShow, isSameUser } = useContext(ReservationContext);

    useEffect(() => {
        setDetail('');
        // Using GET method to print the reservation detail for the host to review
        fetch(`http://localhost:8000/reservation/${resid}/cancel/`, {
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

    const handleCancel = async (event) => {
        event.preventDefault();
        handleShow();
        let user_selection = await waitForCond('popupagreed');
        if (user_selection) {
            seterrorMes("");
            const errors = [];
            const today = new Date().toISOString().slice(0, 10);

            if (detail.check_in < today || detail.check_out < today) {
                errors.push("Error: The reservation date has passed.");
            }
            fetch(`http://localhost:8000/reservation/${resid}/cancel/`, {
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
                        fetch(`http://localhost:8000/reservation/${resid}/cancel/`, {
                            mode: "cors",
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${window.localStorage['jwt']}`
                            },
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                alert(`Your reservation status changed to ${data[0].reservation_status}`);
                            });
                    } else {
                        alert("You failed to cancel the reservation.")
                    }
                })
                .catch(error => { console.log(error); });
        }
        // if (isSameUser(detail.host)) {
        //     window.location.href = "/reservation/hostlist";
        // } else {
        //     window.location.href = "/reservation/guestlist";
        // }
        // window.location.href = "/reservationlist";
    }

    return (
        <>
            <Container className=" my-5">
                {errorMes && <div className="text-center">{errorMes}</div>}
                <ReservationDetails details={detail} buttonText={'Cancel the reservation'} buttonClick={handleCancel} />
            </Container>
            <PopModal title={"Cancel the reservation"} content={"Do you want to cancel the reservation?"} />
        </>
    );
};

export default ReservationCancel;
