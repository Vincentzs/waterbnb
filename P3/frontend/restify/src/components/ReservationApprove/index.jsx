import { useContext, useEffect } from "react";
import { ReservationContext } from "../../contexts/ReservationContext";
import { useParams } from "react-router-dom"
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import ReservationDetails from "../ReservationDetail";

const ReservationApprove = () => {
    const { resid } = useParams();
    const { detail, setDetail, errorMes, seterrorMes } = useContext(ReservationContext);

    useEffect(() => {
        // Using GET method to print the reservation detail for the host to review
        fetch(`http://localhost:8000/reservation/${resid}/approved/`, {
            mode: "cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": "Bearer " + token
            },
        })
            .then((response) => response.json())
            .then((data) => setDetail(data[0]));
    }, []);

    const handleApprove = (event) => {
        event.preventDefault();
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
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    const newWindow = window.open('', 'Reservation Approved', 'height=200,width=400');
                    newWindow.document.write('<h1>You approved the reservation successfully!</h1>');
                } else {
                    seterrorMes("Error: Fail to approve the reservation.");
                }
            })
            .catch((error) => seterrorMes(error));
    };

    return (
        <Container className=" my-5">
            {errorMes && <div className="text-center">{errorMes}</div>}
            <ReservationDetails details={detail} buttonText={'Approve the request!'} buttonClick={handleApprove} />
        </Container>
    );
};

export default ReservationApprove;
