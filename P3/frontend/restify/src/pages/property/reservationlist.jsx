import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { ReservationContext, useReservationContext, } from "../../contexts/ReservationContext";
import StatusList from '../../components/Status';

const RES_STATUS = [
  ['pending', 'Pending'],
  ['denied', 'Denied'],
  ['expired', 'Expired'],
  ['approved', 'Approved'],
  ['canceled', 'Canceled'],
  ['terminated', 'Terminated'],
  ['completed', 'Completed']
];

const Reservation = () => {
  const [selectedStatus, setSelectedStatus] = useState("completed");

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

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

      <DropdownButton title="Select Status" variant="outline-success" className="m-2">
        {RES_STATUS.map(([statusKey, statusLabel]) => (
          <Dropdown.Item key={statusKey} onClick={() => handleStatusChange(statusKey)} active={selectedStatus === statusKey}>
            {statusLabel}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <ReservationContext.Provider value={useReservationContext()}>
        <StatusList selectedStatus={selectedStatus} />
      </ReservationContext.Provider>
    </div>
  );
};

export default Reservation;
