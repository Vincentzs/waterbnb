import { useContext, useEffect } from "react";
import { ReservationContext } from "../../contexts/ReservationContext";
import { useParams } from "react-router-dom"
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import ReservationDetails from "../ReservationDetail";
import PopModal from "../PopupModal";

const ReservationApprove = () => {
    const { resid } = useParams();
    const { detail, setDetail, errorMes, seterrorMes, handleShow, isSameUser } = useContext(ReservationContext);

    useEffect(() => {
        // Using GET method to print the reservation detail for the host to review
        fetch(`http://localhost:8000/reservation/${resid}/approved/`, {
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

    const handleApprove = async (event) => {
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

            if (detail.reservation_status !== 'pending') {
                errors.push('You cannot approve a reservation request unless it is under pending');
            }

            if (errors.length > 0) {
                seterrorMes(errors.join("\n"));
                return;
            }

            fetch(`http://localhost:8000/reservation/${resid}/approved/`, {
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
                        alert("You approved the reservation successfully!")
                    } else {
                        alert("You failed to approve the reservation.")
                    }
                })
                .catch((error) => seterrorMes(error));
        }
        if (isSameUser(detail.host)) {
            window.location.href = "/reservation/hostlist";
        } else {
            window.location.href = "/reservation/guestlist";
        }
    };

    return (
        <>
            <Container className=" my-5">
                {errorMes && <div className="text-center">{errorMes}</div>}
                <ReservationDetails details={detail} buttonText={'Approve the request!'} buttonClick={handleApprove} />
            </Container>
            <PopModal title={"Approve the reservation"} content={"Do you want to approve the reservation?"} />
        </>

    );
};

export default ReservationApprove;
