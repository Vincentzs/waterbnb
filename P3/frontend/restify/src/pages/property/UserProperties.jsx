import React, { useState, useEffect } from "react";

function UserProperties() {
  const [properties, setProperties] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchProperties() {
      const response = await fetch(
        "http://127.0.0.1:8000/property/properties_by_user/",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage["jwt"]}`,
          },
        }
      );
      const data = await response.json();
      setProperties(data);
    }
    fetchProperties();
  }, []);

  const handleDelete = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      const response = await fetch(
        `http://127.0.0.1:8000/property/delete/${propertyId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${window.localStorage["jwt"]}`,
          },
        }
      );

      if (response.ok) {
        setMessage("Property deleted successfully");
        setProperties(
          properties.filter((property) => property.id !== propertyId)
        );
      } else {
        setMessage("Error deleting property");
      }
    }
  };

  const handleEdit = (propertyId) => {
    window.location.href = `property-update/${propertyId}/`;
  };

  return (
    <div>
      <h1>Your Properties</h1>
      {message && <p>{message}</p>}
      {properties.length === 0 ? (
        <p>No more properties</p>
      ) : (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              {property.property_name}{" "}
              <button onClick={() => handleDelete(property.id)}>Delete</button>
              <button onClick={() => handleEdit(property.id)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserProperties;
