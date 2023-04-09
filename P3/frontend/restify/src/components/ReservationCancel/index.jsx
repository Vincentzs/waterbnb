import { useContext, useEffect } from "react";
import { ReservationContext } from "../../contexts/ReservationContext";
import { useParams } from "react-router-dom"
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import ReservationDetails from "../ReservationDetail";

const ReservationCancel = () => {
    const { resid } = useParams();
    const { detail, setDetail, errorMes, seterrorMes } = useContext(ReservationContext);

    useEffect(() => {
        setDetail('');
        // Using GET method to print the reservation detail for the host to review
        fetch(`http://localhost:8000/reservation/${resid}/cancel/`, {
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

    const handleCancel = (event) => {
        event.preventDefault();
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
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    fetch(`http://localhost:8000/reservation/${resid}/cancel/`, {
                        mode: "cors",
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            // "Authorization": "Bearer " + token
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data[0])
                            const newWindow = window.open('', `Reservation ${data[0].reservation_status}`, 'height=200,width=400');
                            newWindow.document.write(`<h1>You reservation status changed to ${data[0].reservation_status} !</h1>`);
                        });
                } else {
                    seterrorMes("Error: Fail to cancel the reservation.");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <Container className=" my-5">
            {errorMes && <div className="text-center">{errorMes}</div>}
            <ReservationDetails details={detail} buttonText={'Cancel the reservation'} buttonClick={handleCancel} />
        </Container>
    );
};

export default ReservationCancel;
