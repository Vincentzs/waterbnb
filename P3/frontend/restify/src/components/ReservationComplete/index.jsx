import { useContext, useEffect } from "react";
import { ReservationContext } from "../../contexts/ReservationContext";
import { useParams } from "react-router-dom"
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import ReservationDetails from "../ReservationDetail";

const ReservationComplete = () => {
    const { resid } = useParams();
    const { detail, setDetail, errorMes, seterrorMes } = useContext(ReservationContext);

    useEffect(() => {
        setDetail('');
        // Using GET method to print the reservation detail for the host to review
        fetch(`http://localhost:8000/reservation/${resid}/completed/`, {
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

    const handleComplete = (event) => {
        event.preventDefault();
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
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    const newWindow = window.open('', 'Reservation Completed', 'height=200,width=400');
                    newWindow.document.write('<h1>You complete the reservation successfully!</h1>');
                } else {
                    seterrorMes("Error: Fail to complete the reservation.");
                }
            })
            .catch((error) => seterrorMes(error));
    };

    return (
        <Container className=" my-5">
            {errorMes && <div className="text-center">{errorMes}</div>}
            <ReservationDetails details={detail} buttonText={'You can complet the reservation now.'} buttonClick={handleComplete} />
        </Container>
    );
};

export default ReservationComplete;