import { createContext, useContext, useEffect, useState } from "react";
import { Card, Button, Row, Col, Container, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReserCard from "../ReservationCard";

const StatusList = ({ selectedStatus }) => {
  const [statusList, setStatusList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // get the fetched the current page reservation message
  useEffect(() => {
    fetch(`http://localhost:8000/reservation/all/${selectedStatus}/?page=${page}`, {
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
        setStatusList(json.results);
        setTotalPages(json.count); // Assuming the API returns the total_pages value
      })
      .catch((error) => console.error(error));
  }, [page, selectedStatus]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages / 2) {
      setPage(page + 1);
    }
  };

  return (
    <Container>
      {statusList.map((message) => (
        <ReserCard key={message.id} reservationDetail={message} />
      ))}
      <Pagination className="justify-content-center mt-3">
        <Pagination.Prev onClick={handlePrevPage} disabled={page === 1} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next
          onClick={handleNextPage}
          disabled={page === totalPages}
        />
      </Pagination>
    </Container>
  );
};

export default StatusList;
