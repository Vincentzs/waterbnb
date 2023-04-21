import React, { useState } from "react";
import axios from "axios";
import API from "../../Api/Api";
import "./Account.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API + "/user/login/", {
        username,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      // localStorage.setItem("access", response.data.access);F
      // localStorage.setItem("refresh", response.data.refresh);
      window.location.href = "/";
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>

    // <>
    //   <header className="bg-dark py-5">
    //     <div className="container px-4 px-lg-5 my-1">
    //       <div className="text-center text-white">
    //         <div
    //           style={{
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //           }}
    //         >
    //           <h1 className="display-4 fw-bolder">Login</h1>
    //         </div>
    //       </div>
    //     </div>
    //   </header>

    //   <section
    //     className="container px-4 px-lg-5 pt-4"
    //     style={{ minHeight: "70vh" }}
    //   >
    //     <form onSubmit={handleSubmit}>
    //       <h3>Log In</h3>
    //       <div className="form-group">
    //         <label>Username</label>
    //         <input
    //           type="text"
    //           id="username"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label>Password</label>
    //         <input
    //           type="password"
    //           className="form-control"
    //           placeholder="Enter password"
    //           value={password}
    //           onChange={(e) => {
    //             setPassword(e.target.value);
    //           }}
    //         />
    //       </div>

    //       <button type="submit" className="btn btn-primary">
    //         Login
    //       </button>
    //     </form>

    //     <div style={{ color: "red" }}>{error}</div>
    //     <div style={{ height: "calc(100% - 34px)" }}> </div>
    //   </section>
    // </>
  );
}

export default Login;
