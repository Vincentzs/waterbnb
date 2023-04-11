import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ReservationList = () => {
  return (
    <div className="text-center">
      <h1>Reservation List</h1>
      <Link to="/reservation/hostlist">
        <Button variant="outline-success" className="m-2">
          Show Host Reservations
        </Button>
      </Link>
      <Link to="/reservation/guestlist">
        <Button variant="outline-success" className="m-2">
          Show Guest Reservations
        </Button>
      </Link>
      <Link to="/reservation/completedlist">
        <Button variant="outline-success" className="m-2">
          Show Completed Reservations
        </Button>
      </Link>
      <Link to="/reservation/deniedlist">
        <Button variant="outline-success" className="m-2">
          Show Denied Reservations
        </Button>
      </Link>
      <Link to="/reservation/canceledlist">
        <Button variant="outline-success" className="m-2">
          Show Cancelled Reservations
        </Button>
      </Link>
      <Link to="/reservation/approvedlist">
        <Button variant="outline-success" className="m-2">
          Show Approved Reservations
        </Button>
      </Link>
      <Link to="/reservation/pendinglist">
        <Button variant="outline-success" className="m-2">
          Show Pending Reservations
        </Button>
      </Link>
      <Link to="/reservation/terminatedlist">
        <Button variant="outline-success" className="m-2">
          Show Terminated Reservations
        </Button>
      </Link>
      <Link to="/reservation/expiredlist">
        <Button variant="outline-success" className="m-2">
          Show Expired Reservations
        </Button>
      </Link>
    </div>
  );
};

export default ReservationList;
