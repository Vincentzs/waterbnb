// import React from "react";
// import API from "../../Api/Api";

// const Header = (props) => {
//   const [val, setVal] = React.useState("");
//   const _handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       window.location.href = val ? API + "property-search" + val : "";
//     }
//   };

//   return (
//     <header className="bg-dark py-5">
//       <div className="container px-20 px-lg-20 my-5">
//         <div className="text-center text-white">
//           <h1 className="display-2 fw-bolder">
//             {props.isHome ? "Welcome to Restify" : "Search Results"}
//           </h1>
//           <p className="lead fw-normal text-white-50 mb-0">
//             {props.isHome
//               ? "Search below for properties in your area"
//               : "Here are the closest matching properties for your search"}
//           </p>
//         </div>
//         <form
//           className="row justify-content-center"
//           style={{ marginTop: "20px" }}
//         >
//           <div className="col-md-8 align-self-center">
//             <input
//               className="form-control mr-sm-3"
//               type="search"
//               id="searchBar"
//               style={{
//                 fontSize: "20px",
//                 paddingLeft: "25px",
//                 paddingTop: "10px",
//                 paddingBottom: "10px",
//               }}
//               placeholder="Search for properties..."
//               aria-label="Search"
//               onKeyDown={_handleKeyDown}
//               value={val}
//               onChange={(e) => {
//                 setVal(e.target.value);
//               }}
//             />
//           </div>
//           <div className="col-md-2 align-self-center">
//             <a
//               className="btn btn-success my-2 my-sm-0 btn-lg"
//               href={val ? API + "property-search" + val : ""}
//             >
//               Search
//             </a>
//           </div>
//         </form>
//       </div>
//     </header>
//   );
// };

// export default Header;
