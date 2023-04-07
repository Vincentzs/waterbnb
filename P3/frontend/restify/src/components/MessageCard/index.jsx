import React, { useContext, useState } from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotificationContext } from "../../contexts/NotificationContext";
import DetailCard from "../DetailCard";

const MessageCard = ({ message }) => {
  const {showDetail, setShowDetail, detail, setDetail, resetDetail } = useContext(NotificationContext);
  
  const handleReadMore = () => {
    fetch(`http://127.0.0.1:8000/notification/${message.id}/detail/`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer " + token
      },
    })
      .then(response => {
        if (response.status===200) {
          return response.json();
        }
      })
      .then(json => {
        setDetail(json);
        setShowDetail(message.id);
      })
      .catch((error) => console.log(error));
  };

  if (showDetail === message.id) {
    return <DetailCard detail={detail} resetDetail={resetDetail} id={message.id} />;
  } else {
    return (
      <Row className="justify-content-md-center my-3">
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>{message.title} </div>
              <div>
                {message.read ? (
                  <Badge bg="info">Read</Badge>
                ) : (
                  <Badge bg="warning">Unread</Badge>
                )}
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>You received a {message.notification_type} message.</Card.Text>
              <Button variant={"outline-info"} onClick={handleReadMore}>
                Read more
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
};

export default MessageCard;