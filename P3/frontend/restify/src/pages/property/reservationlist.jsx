import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(1);
  const [criteria, setCriteria] = useState("");
  const statuses = [
    "pending",
    "expired",
    "approved",
    "denied",
    "canceled",
    "terminated",
    "completed",
  ];

  const fetchData = async (criteria) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/reservation/all/${criteria}/?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage["jwt"]}`,
          },
        }
      );
      console.log(response);
      const data = await response.json();
      setReservations(data.results);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    if (criteria) {
      fetchData(criteria);
    }
  }, [criteria, page]);

  const handleButtonClick = (newCriteria) => {
    setCriteria(newCriteria);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <h1>Reservation List</h1>
      <Link to="/reservation/hostlist">
        <button>Show Host Reservations</button>
      </Link>
      <Link to="/reservation/guestlist">
        <button>Show Guest Reservations</button>
      </Link>
      {statuses.map((status) => (
        <button key={status} onClick={() => handleButtonClick(status)}>
          {status}
        </button>
      ))}
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>{reservation.property_name}</li>
        ))}
      </ul>
      <button onClick={handlePreviousPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}

export default ReservationList;
