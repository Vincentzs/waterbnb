import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../Api/Api";
import authHeader from "./AuthHeader";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(API + "/user/profile/", {
          headers: authHeader(), // Use the authHeader function
        });
        setUserData(response.data);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Profile</h1>
          <img
            src={userData.profile_image}
            alt="Profile"
            width="150"
            height="150"
          />
          <h2>{userData.username}</h2>
          <p>
            Name: {userData.first_name} {userData.last_name}
          </p>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
          <p>Contact Method: {userData.contact_method}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
