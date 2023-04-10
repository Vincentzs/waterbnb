import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PropertyDetail(props) {
  const [property, setProperty] = useState(null);
  const { propertyId } = useParams();

  useEffect(() => {
    async function fetchProperty() {
      const response = await fetch(
        `http://127.0.0.1:8000/property/property_detail/${propertyId}/`
      );
      console.log(response);
      const data = await response.json();
      setProperty(data);
    }
    fetchProperty();
  }, [props.match]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{property.property_name}</h1>
      <p>{property.description}</p>
      <p>Location: {property.location}</p>
      <p>Guest capacity: {property.guest_capacity}</p>
      <p>Rating: {property.rating}</p>
      <p>Amenities: {property.amenity.join(", ")}</p>
      <p>Available dates:</p>
      {/* <ul>
        {property.available_dates.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul> */}
      <div>
        <h2>Property Images:</h2>
        {property.images.map((imageObj) => (
          <img
            key={imageObj.id}
            src={imageObj.image}
            alt={`Property image ${imageObj.id}`}
            style={{ width: "200px", height: "auto", margin: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}

export default PropertyDetail;
