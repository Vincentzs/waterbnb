import React, { useState } from "react";

const PropertyCreate = () => {
  const [property_name, setPropertyName] = useState("");
  const [description, setDescription] = useState("");
  const [default_price, setDefaultPrice] = useState("");
  const [location, setLocation] = useState("");
  const [guest_capacity, setGuestCapacity] = useState("");
  const [amenity, setAmenity] = useState([]);
  const [rating, setRating] = useState("");
  const [propertyImage, setPropertyImage] = useState(null);

  const [formErrors, setFormErrors] = useState([]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const validateForm = () => {
    const errors = [];

    if (property_name.trim() === "") {
      errors.push("Property name is required.");
    }

    if (description.trim() === "") {
      errors.push("Description is required.");
    }

    if (default_price.trim() === "") {
      errors.push("Default price is required.");
    }

    if (location.trim() === "") {
      errors.push("Location is required.");
    }

    if (amenity.length === 0) {
      errors.push("At least one amenity must be selected.");
    }

    if (guest_capacity.trim() === "") {
      errors.push("Guest capacity is required.");
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let propertyImageBase64 = null;
    if (propertyImage) {
      try {
        propertyImageBase64 = await fileToBase64(propertyImage);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }

    const requestBody = {
      property_name,
      description,
      default_price,
      location,
      guest_capacity,
      amenity,
      rating,
      property_image: propertyImageBase64,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/property/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Property created:", data);
      } else {
        console.error("Error creating property:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  const handleAmenityChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setAmenity([...amenity, value]);
    } else {
      setAmenity(amenity.filter((item) => item !== value));
    }
  };

  return (
    <div>
      <h1>Create Property</h1>
      {formErrors.length > 0 && (
        <div>
          <p>Please fix the following errors:</p>
          <ul>
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Property Name:{" "}
          <input
            type="text"
            value={property_name}
            onChange={(e) => setPropertyName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:{" "}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Default Price:{" "}
          <input
            type="number"
            value={default_price}
            onChange={(e) => setDefaultPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Location:
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select location</option>
            {/* Add all the location choices here */}
            <option value="AB">Alberta</option>
            <option value="BC">British Columbia</option>
            <option value="MB">Manitoba</option>
            <option value="NB">New Brunswick</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="NS">Nova Scotia</option>
            <option value="NT">Northwest Territories</option>
            <option value="NU">Nunavut</option>
            <option value="ON">Ontario</option>
            <option value="PE">Prince Edward Island</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
            <option value="YT">Yukon</option>

            {/* ... */}
          </select>
        </label>
        <br />
        <label>
          Guest Capacity:{" "}
          <input
            type="number"
            value={guest_capacity}
            onChange={(e) => setGuestCapacity(e.target.value)}
          />
        </label>
        <br />
        <label>
          Amenities:
          {[
            ["pool", "Pool"],
            ["hottub", "Hottub"],
            ["gym", "Gym"],
            ["parking", "Parking"],
            ["oceanview", "Ocean View"],
            ["restaurant", "Restaurant"],
            ["wifi", "Wifi"],
            ["tv", "TV"],
            ["kitchen", "Kitchen"],
            ["laundry", "Laundry"],
            ["pets", "Pets"],
            ["smoking", "Smoking"],
            ["airconditioning", "AirConditioning"],
            ["heating", "Heating"],

            // ...
          ].map(([value, label]) => (
            <label key={value}>
              <input
                type="checkbox"
                value={value}
                checked={amenity.includes(value)}
                onChange={handleAmenityChange}
              />{" "}
              {label}
            </label>
          ))}
        </label>
        <br />

        <button type="submit">Create Property</button>
      </form>
    </div>
  );
};

export default PropertyCreate;
