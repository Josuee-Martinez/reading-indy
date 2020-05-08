import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { authenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <li className="logo">
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/account">Account</Link>
      </li>
      <li>
        <Link to="/profiles">Community</Link>
      </li>
      <li>
        <Link to="/reviews">Reviews</Link>
      </li>
      <li>
        <a href="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt"> </i> Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="logo">
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/profiles">Community</Link>
      </li>
    </Fragment>
  );

  function openSlideMenu() {
    document.getElementById("side-menu").style.width = "230px";
  }

  function closeSlideMenu() {
    document.getElementById("side-menu").style.width = "0";
  }

  return (
    <Fragment>
      <nav className="navigation-nav">
        <span className="open-slide">
          <a href="#!" onClick={openSlideMenu}>
            <svg width="30" height="30">
              <path d="M0,5 30,5" stroke="#000" strokeWidth="5" />
              <path d="M0,14 30,14" stroke="#000" strokeWidth="5" />
              <path d="M0,23 30,23" stroke="#000" strokeWidth="5" />
            </svg>
          </a>
        </span>

        <ul className="navbar-nav">
          <li className="logo bold">
            <Link to="/"> Reading Indy</Link>
          </li>
        </ul>
      </nav>

      <div id="side-menu" className="side-nav">
        <a href="#!" className="btn-close" onClick={closeSlideMenu}>
          &times;
        </a>
        {!loading && (
          <Fragment>{authenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

// const Navbar = () => {
//   function openSlideMenu() {
//     document.getElementById("side-menu").style.width = "100%";
//     document.getElementById("main").style.marginLeft = "250px";
//   }

//   function closeSlideMenu() {
//     document.getElementById("side-menu").style.width = "0";
//     document.getElementById("main").style.marginLeft = "0";
//   }

//   return (
//     <Fragment>
//       <nav class="navbar">
//         <span class="open-slide">
//           <a href="#" onClick={openSlideMenu}>
//             <svg width="30" height="30">
//               <path d="M0,5 30,5" stroke="#fff" stroke-width="5" />
//               <path d="M0,14 30,14" stroke="#fff" stroke-width="5" />
//               <path d="M0,23 30,23" stroke="#fff" stroke-width="5" />
//             </svg>
//           </a>
//         </span>

//         <ul class="navbar-nav">
//           <li>
//             <a href="#">Home</a>
//           </li>
//           <li>
//             <a href="#">About</a>
//           </li>
//           <li>
//             <a href="#">Services</a>
//           </li>
//           <li>
//             <a href="#">Contact</a>
//           </li>
//         </ul>
//       </nav>

//       <div id="side-menu" class="side-nav">
//         <a href="#" class="btn-close" onClick={closeSlideMenu}>
//           &times;
//         </a>
//         <a href="#">Home</a>
//         <a href="#">About</a>
//         <a href="#">Services</a>
//         <a href="#">Contact</a>
//       </div>
//     </Fragment>
//   );
// };
