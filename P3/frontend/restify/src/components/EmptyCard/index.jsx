import React, { useContext, useState } from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotificationContext } from "../../contexts/NotificationContext";

const EmptyCard = ({id}) => {
    return (
        <Row className="justify-content-md-center my-3">
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              Delete message id:{id}
            </Card.Header>
            <Card.Body>
              <Card.Text>You deleted the message successfully.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
    </Row>);
}
export default EmptyCard;