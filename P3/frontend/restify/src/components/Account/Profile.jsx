import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../Api/Api";
import authHeader from "./AuthHeader";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [selectedFile, setSelectedFile] = React.useState();
  const navigate = useNavigate();
  console.log("*****************************");
  console.log(userData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(API + "/user/profile/", {
          headers: authHeader(),
        });
        console.log("*****************************");
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    console.log("************USERDATA*****************");
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    if (!selectedFile) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        profile_image: undefined,
      }));
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setUserData((prevUserData) => ({
      ...prevUserData,
      profile_image: objectUrl,
    }));
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSubmit = (event) => {
    // console.log(event);
    event.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.access) {
      config.headers["Authorization"] = "Bearer " + user.access;
      // console.log(config);
    }
    let formData = new FormData();

    if (userData.password1 && userData.password2) {
      formData.append("password1", userData.password1);
      formData.append("password2", userData.password2);
    }
    formData.append("first_name", userData.first_name);
    formData.append("last_name", userData.last_name);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("contact_method", userData.contact_method);
    if (selectedFile) {
      formData.append("profile_image", selectedFile);
    }

    // console.log(formData);
    if (!userData) {
      return;
    }
    // for (var pair of formData.entries()) {
    //   console.log("****************************************************");
    //   console.log(pair[0] + ": " + pair[1]);
    //   console.log(typeof pair[0] + ": " + typeof pair[1]);
    // }
    axios.put(API + "/user/profile/edit/", formData, config).then(
      (response) => {
        // console.log(response);
        document.location.reload();
      },
      (reponse) => {
        console.log("Error");
      }
    );
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="container-xl px-4 mt-4" style={{ minHeight: "85vh" }}>
      {userData ? (
        <>
          <h1
            className="display-5"
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            User Profile for {userData.username}
          </h1>
          <div className="row">
            <div className="col-xl-4">
              <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                  <img
                    className="img-account-profile mb-2"
                    src={userData.profile_image}
                    alt=""
                    style={{ maxWidth: "200px" }}
                  />
                  <div className="small font-italic text-muted mb-4">
                    JPG or PNG no larger than 5 MB
                  </div>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Empty"
                    onChange={onSelectFile}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card mb-4">
                <div className="card-header">Account Details</div>
                <div className="card-body">
                  <form>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputFirstName">
                          First name
                        </label>
                        <input
                          className="form-control"
                          id="inputFirstName"
                          type="text"
                          placeholder="Enter your first name"
                          value={userData.first_name}
                          onChange={(e) =>
                            setUserData((prevUserData) => ({
                              ...prevUserData,
                              first_name: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputLastName">
                          Last name
                        </label>
                        <input
                          className="form-control"
                          id="inputLastName"
                          type="text"
                          placeholder="Enter your last name"
                          value={userData.last_name}
                          onChange={(e) =>
                            setUserData((prevUserData) => ({
                              ...prevUserData,
                              last_name: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputEmail">
                          Email
                        </label>
                        <input
                          className="form-control"
                          id="inputEmail"
                          type="email"
                          placeholder="Enter your email"
                          value={userData.email}
                          onChange={(e) =>
                            setUserData((prevUserData) => ({
                              ...prevUserData,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputPhone">
                          Phone number
                        </label>
                        <input
                          className="form-control"
                          id="inputPhone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={userData.phone}
                          onChange={(e) =>
                            setUserData((prevUserData) => ({
                              ...prevUserData,
                              phone: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputPass">
                          Password
                        </label>
                        <input
                          className="form-control"
                          id="inputPass"
                          type="password"
                          placeholder="Enter a new password"
                          value={userData.password1}
                          onChange={(e) =>
                            setUserData((prevUserData) => ({
                              ...prevUserData,
                              password1: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputPass">
                          Password Confirmation
                        </label>
                        <input
                          className="form-control"
                          id="inputPassConfirm"
                          type="password"
                          placeholder="ReEnter new password"
                          value={userData.password2}
                          onChange={(e) =>
                            setUserData((prevUserData) => ({
                              ...prevUserData,
                              password2: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputContact">
                          Contact Method
                        </label>
                        <select
                          id="inputContactMethod"
                          value={userData.contact_method}
                          onChange={(e) =>
                            setUserData((prevUserData) => ({
                              ...prevUserData,
                              contact_method: e.target.value,
                            }))
                          }
                        >
                          <option value="phone">Phone</option>
                          <option value="email">Email</option>
                        </select>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      Save changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Profile;
