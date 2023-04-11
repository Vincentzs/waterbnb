import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../../contexts/ReservationContext";
import { Modal, Form, Button, Container, Alert, Select } from 'react-bootstrap';
import PopModal from "../PopupModal";

const AMENITY_CHOICES = [
    { value: "pool", label: "Pool" },
    { value: "hottub", label: "Hot tub" },
    { value: "gym", label: "Gym" },
    { value: "parking", label: "Parking" },
    { value: "oceanview", label: "Ocean View" },
    { value: "restaurant", label: "Restaurant" },
    { value: "wifi", label: "Wifi" },
    { value: "tv", label: "TV" },
    { value: "kitchen", label: "Kitchen" },
    { value: "laundry", label: "Laundry" },
    { value: "pets", label: "Pets" },
    { value: "smoking", label: "Smoking" },
    { value: "airconditioning", label: "Air Conditioning" },
    { value: "heating", label: "Heating" },
];

const ReservationCreate = () => {
    const { formData, setFormData, guest, setGuest, setHostList, hostList, propertyList, setPropertyList, amenities, setAmenities, success, setSuccess, handleShow } = useContext(ReservationContext);

    // fetch the host list and guest, once people mount the website
    useEffect(() => {
        fetch('http://localhost:8000/reservation/hostlist/', {
            mode: "cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage['jwt']}`
            },
        })
            .then((response) => {
                if (response.status === 401) {
                    window.location.href = "/user/login";
                }
                return response.json();
            })
            .then((data) => setHostList(data.results));

        fetch('http://localhost:8000/reservation/guest/', {
            mode: "cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage['jwt']}`
            },
        })
            .then((response) => response.json())
            .then((data) => setGuest(data[0]));
    }, []);

    //   fetch the property that contain certain amentities, if not available, fetch all property
    useEffect(() => {
        let url = 'http://localhost:8000/reservation/propertylist/';

        if (amenities.length > 0) {
            const amenityParams = amenities.join(',');
            url = `http://localhost:8000/property/search/?amenity=${amenityParams}`;
        }

        // Fetch property list
        fetch(url, {
            mode: "cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage['jwt']}`
            },
        })
            .then((response) => response.json())
            .then((data) => setPropertyList(data.results));
    }, [amenities]);

    function waitForCond(variable) {
        function waitFor(result) {
            if (result !== undefined) {
                return result;
            }
            return new Promise((resolve) => setTimeout(resolve, 100))
                .then(() => Promise.resolve(window[variable]))
                .then((res) => waitFor(res));
        }
        return waitFor();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleShow();
        let user_selection = await waitForCond('popupagreed');
        if (user_selection) {
            setSuccess("");
            const errors = [];
            const today = new Date().toISOString().slice(0, 10);
            const checkInDate = formData.check_in;
            const checkOutDate = formData.check_out;

            if (checkInDate < today) {
                errors.push("Error: Check-in date cannot be before today.");
            }

            if (checkOutDate <= checkInDate) {
                errors.push("Error: Check-out date must be after check-in date.");
            }

            if (formData.number_of_guests <= 0) {
                errors.push("Error: Number of guests must be a valid number.");
            }

            if (errors.length > 0) {
                // Display error messages
                const errorMessage = errors.join("\n");
                setSuccess(errorMessage);
                return;
            }

            fetch('http://localhost:8000//reservation/create/', {
                mode: "cors",
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${window.localStorage['jwt']}`
                }
            })
                .then(response => {
                    if (response.status === 201) {
                        alert("You reserve the property successfully!")
                        // const newWindow = window.open('', 'Reservation Success', 'height=200,width=400');
                        // newWindow.document.write('<h1></h1>');
                    } else {
                        alert("You failed to make the reservation.")
                    }
                })
        }
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const handleAmenitiesChange = (event) => {
        if (amenities.includes(event.target.value)) {
            setAmenities(amenities.filter((amenity) => amenity !== event.target.value));
        } else {
            setAmenities([...amenities, event.target.value]);
        }
    };

    return (
        <Container className="my-3">
            {success && <div className="error-message text-center">{success}</div>}
            <Form onSubmit={handleSubmit} style={{ margin: '0 auto', width: '40%' }}>
                <Form.Group controlId="check_in" className="my-2">
                    <Form.Label>Check In</Form.Label>
                    <Form.Control type="date" name="check_in" value={formData.check_in} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group controlId="check_out" className="my-2">
                    <Form.Label>Check Out</Form.Label>
                    <Form.Control type="date" name="check_out" value={formData.check_out} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group controlId="host" className="my-2">
                    <Form.Label>Host</Form.Label>
                    <Form.Select name="host" value={formData.host} onChange={handleInputChange} required>
                        <option>Select host</option>
                        {hostList.map((host) => (
                            <option key={host.id} value={host.id}>{host.username}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="liable_guest" className="my-2">
                    <Form.Label>Liable Guest</Form.Label>
                    <Form.Select name="liable_guest" value={formData.liable_guest} onChange={handleInputChange} required>
                        <option>Select guest</option>
                        <option value={guest.id}>{guest.username}</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="number_of_guests" className="my-2">
                    <Form.Label>Number of Guest</Form.Label>
                    <Form.Control type="number" name="number_of_guests" value={formData.number_of_guests} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group controlId="reservation_status" className="my-2">
                    <Form.Label>Reservation Status</Form.Label>
                    <Form.Select name="reservation_status" value={formData.reservation_status} onChange={handleInputChange} required>
                        <option>Select Status</option>
                        <option value={'Pending'}>Pending</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="place" className="my-2">
                    <Form.Label>properties</Form.Label>
                    <Form.Select name="place" value={formData.place} onChange={handleInputChange} required>
                        <option>Select a property</option>
                        {propertyList.map((property, index) => (
                            <option key={index} value={property.id}>{property.property_name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Amenities:</Form.Label>
                    <div className="row">
                        {AMENITY_CHOICES.map((amenity) => (
                            <div key={amenity.value} className="col-sm-4">
                                <Form.Check
                                    type="checkbox"
                                    label={amenity.label}
                                    value={amenity.value}
                                    checked={amenities.includes(amenity.value)}
                                    onChange={handleAmenitiesChange}
                                />
                            </div>
                        ))}
                    </div>
                </Form.Group>
                <div className="text-center">
                    <Button variant="outline-dark" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
            <PopModal title={"Create a resercation"} content={"Are you sure that you want to make the resercation?"} />
        </Container>
    );
};

export default ReservationCreate;