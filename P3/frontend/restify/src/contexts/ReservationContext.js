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

    return {
        formData, setFormData,
        hostList, setHostList,
        guest, setGuest,
        propertyList, setPropertyList,
        amenities, setAmenities,
        success, setSuccess,
        detail, setDetail,
        errorMes, seterrorMes,
    };
};