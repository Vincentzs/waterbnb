import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PropertyUpdate.css";

function PropertyUpdate() {
  const [property, setProperty] = useState(null);
  const [formData, setFormData] = useState({});
  const { propertyId } = useParams();
  const CHOICES_LOCATION = [
    ["AB", "Alberta"],
    ["BC", "British Columbia"],
    ["MB", "Manitoba"],
    ["NB", "New Brunswick"],
    ["NL", "Newfoundland and Labrador"],
    ["NT", "Northwest Territories"],
    ["NS", "Nova Scotia"],
    ["NU", "Nunavut"],
    ["ON", "Ontario"],
    ["PE", "Prince Edward Island"],
    ["QC", "Quebec"],
    ["SK", "Saskatchewan"],
    ["YT", "Yukon"],
  ];
  const AMENITY_CHOICES = [
    ["pool", "Pool"],
    ["hottub", "Hottub"],
    ["gym", "Gym"],
    ["parking", "Parking"],
    ["oceanview", "OceanView"],
    ["restaurant", "Restaurant"],
    ["wifi", "Wifi"],
    ["tv", "TV"],
    ["kitchen", "Kitchen"],
    ["laundry", "Laundry"],
    ["pets", "Pets"],
    ["smoking", "Smoking"],
    ["airconditioning", "AirConditioning"],
    ["heating", "Heating"],
  ];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [none, setNone] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/property/property_image_upload/${propertyId}/`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${window.localStorage["jwt"]}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.detail);
      } else {
        setMessage("Error uploading images.");
      }
    } catch (error) {
      setMessage("Error uploading images.");
    }
  };

  useEffect(() => {
    async function fetchProperty() {
      const response = await fetch(
        `http://127.0.0.1:8000/property/property_detail/${propertyId}/`
      );
      const data = await response.json();
      setProperty(data);
      setFormData({ ...data });

      const response1 = await fetch(
        `http://127.0.0.1:8000/property/property_detail/${propertyId}/`
      );
      const data1 = await response1.json();
      setImages(data1.images);
    }
    fetchProperty();
  }, [propertyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "amenity") {
      const amenityOptions = [...formData.amenity];
      if (amenityOptions.includes(value)) {
        const index = amenityOptions.indexOf(value);
        amenityOptions.splice(index, 1);
      } else {
        amenityOptions.push(value);
      }
      setFormData({ ...formData, amenity: amenityOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDeleteImage = async (imageId) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage["jwt"]}`,
      },
    };
    console.log(imageId);

    const response = await fetch(
      `http://127.0.0.1:8000/property/delete_image/${imageId}/`,
      requestOptions
    );

    if (response.ok) {
      setImages(images.filter((img) => img.id !== imageId));
      alert("Image deleted successfully");
    } else {
      alert("Error deleting image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append("start_date", startDate);
    if (endDate) queryParams.append("end_date", endDate);
    if (startMonth) queryParams.append("start_month", startMonth);
    if (endMonth) queryParams.append("end_month", endMonth);
    queryParams.append("none", none);
    if (price) queryParams.append("price", price);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage["jwt"]}`,
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      `http://127.0.0.1:8000/property/update/${propertyId}/?${queryParams.toString()}`,
      requestOptions
    );

    if (response.ok) {
      alert("Property updated successfully");
    } else {
      alert("Error updating property");
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
        <label>
          Price:
          <input
            type="number"
            name="default_price"
            value={formData.default_price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Location:
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          >
            {CHOICES_LOCATION.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Guest Capacity:
          <input
            type="number"
            name="guest_capacity"
            value={formData.guest_capacity}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Amenities:
          <select
            name="amenity"
            value={formData.amenity}
            onChange={handleInputChange}
            multiple
          >
            {AMENITY_CHOICES.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="number"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="number"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Start Month:
          <input
            type="number"
            value={startMonth}
            onChange={(e) => setStartMonth(e.target.value)}
          />
        </label>
        <br />
        <label>
          End Month:
          <input
            type="number"
            value={endMonth}
            onChange={(e) => setEndMonth(e.target.value)}
          />
        </label>
        <br />
        <label>
          None:
          <input
            type="checkbox"
            checked={none}
            onChange={(e) => setNone(e.target.checked)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update Property</button>
      </form>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload Images</button>
      {message && <p>{message}</p>}

      <div>
        <h2>Property Images:</h2>
        {images.map((imageObj) => (
          <div key={imageObj.id}>
          <img
            key={imageObj.id}
            src={imageObj.image}
            alt={`Property image ${imageObj.id}`}
            style={{ width: "200px", height: "auto", margin: "10px" }}
          />
          <button onClick={() => handleDeleteImage(imageObj.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyUpdate;
