import React, { useState } from "react";

const ImageUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState("");
  const propertyId = 1; // Replace with the actual property ID you want to use

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

  return (
    <div>
      <h1>Upload Images</h1>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload Images</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUploader;
