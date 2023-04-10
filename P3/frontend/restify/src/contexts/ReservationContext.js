import { createContext, useState } from "react";

export const ReservationContext = createContext();

export const useReservationContext = () => {
    // reservationCreate
    const [formData, setFormData] = useState({
        check_in: "",
        check_out: "",
        host: "",
        liable_guest: "",
        number_of_guests: "",
        reservation_status: "",
        place: "",
    });
    const [hostList, setHostList] = useState([]);
    const [guest, setGuest] = useState([]);
    const [propertyList, setPropertyList] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [success, setSuccess] = useState('');
    // reservation approve
    const [detail, setDetail] = useState([]);
    const [errorMes, seterrorMes] = useState('');

    const [show, setShow] = useState(false);
    const handleConti = () => {
        window['popupagreed'] = true;
        setShow(false);
    }
    const handleClose = () => {
        window['popupagreed'] = false;
        setShow(false);
    }
    const handleShow = () => {
        delete window['popupagreed'];
        setShow(true);
    }

    return {
        formData, setFormData,
        hostList, setHostList,
        guest, setGuest,
        propertyList, setPropertyList,
        amenities, setAmenities,
        success, setSuccess,
        detail, setDetail,
        errorMes, seterrorMes,
        show, setShow,
        handleClose,
        handleShow,
        handleConti,
    };
};