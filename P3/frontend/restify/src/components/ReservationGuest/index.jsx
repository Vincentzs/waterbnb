import { createContext, useContext, useEffect, useState } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReserCard from "../ReservationCard";

const ReservationGuestList = () => {
  const [hostList, setHostList] = useState([]);

  // get the fetched the current page reservation message
  useEffect(() => {
    fetch(`http://localhost:8000/reservation/all/guest/`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage["jwt"]}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((json) => {
        setHostList(json.results);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(hostList);

  return (
    <Container>
      {hostList.map((message) => (
        <ReserCard key={message.id} reservationDetail={message} />
      ))}
    </Container>
  );
};

export default ReservationGuestList;
