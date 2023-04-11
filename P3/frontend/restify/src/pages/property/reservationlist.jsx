import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ReservationList() {

  return (
    <div>
      <h1>Reservation List</h1>
      <Link to="/reservation/hostlist">
        <button>Show Host Reservations</button>
      </Link>
      <Link to="/reservation/guestlist">
        <button>Show Guest Reservations</button>
      </Link>
      <Link to="/reservation/completedlist">
        <button>Show Completed Reservations</button>
      </Link>
      <Link to="/reservation/deniedlist">
        <button>Show Denied Reservations</button>
      </Link>
      <Link to="/reservation/canceledlist">
        <button>Show Cancelled Reservations</button>
      </Link>
      <Link to="/reservation/approvedlist">
        <button>Show Approved Reservations</button>
      </Link>
      <Link to="/reservation/pendinglist">
        <button>Show Pending Reservations</button>
      </Link>
      <Link to="/reservation/terminatedlist">
        <button>Show Terminated Reservations</button>
      </Link>
      <Link to="/reservation/expiredlist">
        <button>Show Expired Reservations</button>
      </Link>

      

    </div>
  );
}

export default ReservationList;
