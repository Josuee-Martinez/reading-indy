import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { setAlert } from "../../actions/alert";
import { signup } from "../../actions/auth";

const Signup = ({ setAlert, signup, authenticated }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = user;

  const handleChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    signup({ user });
  };

  if (authenticated) {
    return <Redirect to="/account" />;
  }

  return (
    <div className="auth-form-div">
      <div className="toggle-div-2">
        <h2>
          <i className="fas fa-users"></i> Sign up!
        </h2>
      </div>
      <form className="form border" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          type="text"
          id="text"
          className="input"
          name="name"
          required
          value={name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          className="input"
          name="email"
          required
          value={email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          id="password"
          className="input"
          name="password"
          required
          value={password}
          onChange={handleChange}
          minLength="5"
        />
        <br />
        <button className="button button-add" type="submit">
          Sign up!
        </button>
      </form>
      <div className="toggle-div">
        <Link to="/login" className="toggle-link">
          Already a member ?
        </Link>
      </div>
    </div>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  authenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(
  mapStateToProps,
  { setAlert, signup }
)(Signup);
