import { Container, Row, Col, Button } from "react-bootstrap";

function ReservationDetails({ details, buttonText, buttonClick }) {
    return (
        <Container className="d-flex justify-content-center" >
            <div className="w-50">
                <Row style={{ border: "1px solid black", padding: "20px" }}>
                    <Col>
                        <p className="font-weight-bold">Check-in:</p>
                        <p>{details.check_in}</p>
                        <hr />
                    </Col>
                    <Col>
                        <p className="font-weight-bold">Check-out:</p>
                        <p>{details.check_out}</p>
                        <hr />
                    </Col>
                </Row>
                <Row style={{ border: "1px solid black", padding: "20px" }}>
                    <Col>
                        <p className="font-weight-bold">Host:</p>
                        <p>{details.host}</p>
                        <hr />
                    </Col>
                    <Col>
                        <p className="font-weight-bold">Liable guest:</p>
                        <p>{details.liable_guest}</p>
                        <hr />
                    </Col>
                </Row>
                <Row style={{ border: "1px solid black", padding: "20px" }}>
                    <Col>
                        <p className="font-weight-bold">Number of guests:</p>
                        <p>{details.number_of_guests}</p>
                        <hr />
                    </Col>
                    <Col>
                        <p className="font-weight-bold">Place:</p>
                        <p>{details.place}</p>
                        <hr />
                    </Col>
                </Row>
                <Row style={{ border: "1px solid black", padding: "20px" }}>
                    <Col>
                        <p className="font-weight-bold">Reservation status:</p>
                        <p>{details.reservation_status}</p>
                        <hr />
                    </Col>
                </Row>
                <div className="text-center my-2">
                    <Button variant="outline-dark" type="submit" onClick={buttonClick}>
                        {buttonText}
                    </Button>
                </div>
            </div>
        </Container>
    );
}
export default ReservationDetails;