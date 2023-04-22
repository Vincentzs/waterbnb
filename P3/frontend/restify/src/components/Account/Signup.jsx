import React, { useState } from "react";
import axios from "axios";
import API from "../../Api/Api";
import "./Account.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("phone");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password1", password1);
    formData.append("password2", password2);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("contact_method", contactMethod);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    console.log(formData);
    try {
      await axios.post(API + "/user/register/", formData);
      alert("Registered");
      window.location.href = "/login";
    } catch (err) {
      setError("Error while signing up. Please try again.");
    }
  };

  return (
    <div className="signup-update-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {error && <div className="error">{error}</div>}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password1">Password:</label>
        <input
          type="password"
          id="password1"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
        <label htmlFor="password2">Confirm Password:</label>
        <input
          type="password"
          id="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label htmlFor="contact_method">Contact Method:</label>
        <select
          id="contact_method"
          value={contactMethod}
          onChange={(e) => setContactMethod(e.target.value)}
        >
          <option value="phone">Phone</option>
          <option value="email">Email</option>
        </select>
        <label htmlFor="profile_image">Profile Image:</label>
        <input
          type="file"
          id="profile_image"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
        <button type="submit">Submit</button>
        <p className="forgot-password text-left">
          Already registered <a href="login/">Sign in?</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
