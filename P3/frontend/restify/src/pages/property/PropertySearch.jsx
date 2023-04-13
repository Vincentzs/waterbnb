import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PropertySearchPage.css";

const PropertySearchPage = () => {
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [guestCapacity, setGuestCapacity] = useState("");
  const [amenities, setAmenities] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const handleSubmit = async (e, page = 1) => {
    e.preventDefault();
    setCurrentPage(page);
    const queryParams = new URLSearchParams();

    if (location) queryParams.append("location", location);
    if (rating) queryParams.append("rating", rating);
    if (guestCapacity) queryParams.append("guest_capacity", guestCapacity);
    if (amenities) queryParams.append("amenity", amenities);
    if (orderBy) queryParams.append("order_by", orderBy);
    if (startDate) queryParams.append("start_date", startDate);
    if (endDate) queryParams.append("end_date", endDate);
    if (startMonth) queryParams.append("start_month", startMonth);
    if (endMonth) queryParams.append("end_month", endMonth);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/property/search/?${queryParams.toString()}&page=${page}`
      );

      const data = await response.json();

      if (data && Array.isArray(data.results)) {
        setProperties(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      } else {
        console.error("Data results is not an array:", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviousPage = (e) => {
    if (previousPage) {
      setCurrentPage(currentPage - 1);
      handleSubmit(e, currentPage - 1);
    }
  };

  const handleNextPage = (e) => {
    if (nextPage) {
      setCurrentPage(currentPage + 1);
      handleSubmit(e, currentPage + 1);
    }
  };
  return (
    <div className="outer-wrapper">
      <h1>Property Search</h1>

      <div className="container">
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Location:{" "}
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <br />
            <label>
              Rating:{" "}
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
              />
            </label>
            <br />
            <label>
              Number of Guest:{" "}
              <input
                type="number"
                value={guestCapacity}
                onChange={(e) => setGuestCapacity(e.target.value)}
                min="1"
              />
            </label>
            <br />
            <label>
              Amenities:{" "}
              <input
                type="text"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
              />
            </label>
            <br />
            <label>
              Order By:
              <select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              >
                <option value="">Select order</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </label>
            <br />
            <label>
              Start Date:{" "}
              <input
                type="number"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min="1"
                max="31"
              />
            </label>
            <br />
            <label>
              End Date:{" "}
              <input
                type="number"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min="1"
                max="31"
              />
            </label>
            <br />
            <label>
              Start Month:{" "}
              <input
                type="number"
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                min="1"
                max="12"
              />
            </label>
            <br />
            <label>
              End Month:{" "}
              <input
                type="number"
                value={endMonth}
                onChange={(e) => setEndMonth(e.target.value)}
                min="1"
                max="12"
              />
            </label>
            <br />
            <button type="submit">Search</button>
          </form>
        </div>

        <div className="results">
          <ul>
            {properties.map((property, index) => (
              <li key={index}>
                {" "}
                {/* Use the index as the key */}
                {property.property_name} - {property.location}
                <br />
                Rating: {property.rating}
                <br />
                Guest Capacity: {property.guest_capacity}
                <br />
                Amenities: {property.amenity.join(", ")}
                <br />
                Price: {property.default_price}
                <br />
                <Link to={`/property-detail/${property.id}/`}>
                  <button>Show more</button>
                </Link>
              </li>
            ))}
          </ul>
          <button disabled={!previousPage} onClick={handlePreviousPage}>
            Previous
          </button>
          <button disabled={!nextPage} onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertySearchPage;
