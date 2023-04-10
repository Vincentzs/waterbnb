import React, { useContext, useEffect } from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotificationContext } from "../../contexts/NotificationContext";
import EmptyCard from "../EmptyCard";

const DetailCard = ({ detail, resetDetail, id }) => {
  const { showDetail, showDelete, setShowDelete, setShowDetail } = useContext(NotificationContext);

  const handleDelete = () => {
    fetch(`http://127.0.0.1:8000/notification/${id}/detail/`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage['jwt']}`
      },
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(
        json => {
          console.log(json);
          // setShowDetail(id);
          setShowDelete(true);
          //alert("try to delete!!!");
        })
      .catch((error) => console.log(error));
  };

  if (showDelete && showDetail === id) {
    return <EmptyCard id={id} />;
  } else {
    return (
      <Row className="justify-content-md-center my-3">
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              {detail.title}
              <div>
                {detail.read ? (
                  <Badge bg="info">Read</Badge>
                ) : (
                  <Badge bg="warning">Unread</Badge>
                )}
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>This is a {detail.notification_type} message.</Card.Text>
              <Card.Text>{detail.text}</Card.Text>
              <Button variant={"outline-info"} onClick={handleDelete}>
                Delete
              </Button>
              <Button
                variant={"outline-primary"}
                className="mx-2"
                onClick={() => setShowDetail(null)}
              >
                Back
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
};

export default DetailCard;