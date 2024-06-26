import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PropertyDetail.css";

function PropertyDetail(props) {
  const [property, setProperty] = useState(null);
  const { propertyId } = useParams();

  useEffect(() => {
    async function fetchProperty() {
      const response = await fetch(
        `http://127.0.0.1:8000/property/property_detail/${propertyId}/`
      );
      const data = await response.json();
      setProperty(data);
    }
    fetchProperty();
  }, [props.match]);

  if (!property) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="heading">{property.property_name}</h1>
      <p className="description">{property.description}</p>
      <p className="location">Location: {property.location}</p>
      <p className="guest-capacity">
        Guest capacity: {property.guest_capacity}
      </p>
      <p className="rating">Rating: {property.rating}</p>
      <p className="amenities">Amenities: {property.amenity.join(", ")}</p>
      <h2>Property Images:</h2>

      <div className="images">
        {property.images.map((imageObj) => (
          <img
            key={imageObj.id}
            className="image"
            src={imageObj.image}
            alt={`Property image ${imageObj.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default PropertyDetail;
