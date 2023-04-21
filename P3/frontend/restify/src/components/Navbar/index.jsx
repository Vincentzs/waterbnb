import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    // <nav>
    //   <ul>
    //     <li>
    //       <Link to="/signup">Sign Up</Link>
    //     </li>
    //     <li>
    //       <Link to="/login">Login</Link>
    //     </li>
    //     <li>
    //       <Link to="/profile">Profile</Link>
    //     </li>
    //   </ul>
    // </nav>
    <header>
      {/* Add your logo and other navigation links here */}
      <nav>
        <ul>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/profile">View Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
