import React, { useContext, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReservationContext } from "../../contexts/ReservationContext";

function actionMiddleware(self) {
  let rid = self.target.id.split("-")[1];
  let action = self.target.id.split("-")[0];
  window.location.href = `/reservation/${rid}/${action}`;
}

const ReserCard = ({ reservationDetail }) => {
  const { isSameUser } = useContext(ReservationContext);
  function canApprove(reservationDetail) {
    return (
      isSameUser(reservationDetail.host) &&
      reservationDetail.reservation_status === "pending"
    );
  }
  function canCancel(reservationDetail) {
    // console.log(reservationDetail.reservation_status);
    return ["pending", "approved"].includes(
      reservationDetail.reservation_status
    );
  }
  console.log(ReservationContext);
  return (
    <Row className="justify-content-md-center my-3">
      <Col md={6}>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            Resercation for palce {reservationDetail.place} from{" "}
            {reservationDetail.check_in} to {reservationDetail.check_out}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              It's in {reservationDetail.reservation_status} status.{" "}
            </Card.Text>
            <Button
              style={{
                display: `${canApprove(reservationDetail) ? "" : "none"}`,
              }}
              variant={"outline-primary"}
              id={`approve-${reservationDetail.id}`}
              onClick={actionMiddleware}
              className="mx-2"
            >
              Approve
            </Button>
            <Button
              style={{
                display: `${canCancel(reservationDetail) ? "" : "none"}`,
              }}
              variant={"outline-primary"}
              id={`cancel-${reservationDetail.id}`}
              onClick={actionMiddleware}
              className="mx-2"
            >
              Cancel
            </Button>
            <Button
              style={{
                display: `${reservationDetail.reservation_status === "approved"
                    ? ""
                    : "none"
                  }`,
              }}
              variant={"outline-success"}
              id={`complete-${reservationDetail.id}`}
              onClick={actionMiddleware}
              className="mx-2"
            >
              Complete
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ReserCard;
