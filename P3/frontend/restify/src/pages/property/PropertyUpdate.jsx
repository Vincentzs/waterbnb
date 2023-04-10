import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PropertyUpdate() {
  const [property, setProperty] = useState(null);
  const [formData, setFormData] = useState({});
  const { propertyId } = useParams();

  useEffect(() => {
    async function fetchProperty() {
      const response = await fetch(
        `http://127.0.0.1:8000/property/property_detail/${propertyId}/`
      );
      const data = await response.json();
      setProperty(data);
      setFormData({ ...data });
    }
    fetchProperty();
  }, [propertyId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify(formData),
    };
    console.log( localStorage.getItem('token'))

    const response = await fetch(
      `http://127.0.0.1:8000/property/update/${propertyId}/`,
      requestOptions
    );

    if (response.ok) {
      alert('Property updated successfully');
    } else {
      alert('Error updating property');
    }
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Update Property</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Property Name:
          <input
            type="text"
            name="property_name"
            value={formData.property_name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        {/* Add the remaining form fields as needed */}
        <button type="submit">Update Property</button>
      </form>
    </div>
  );
}

export default PropertyUpdate;
