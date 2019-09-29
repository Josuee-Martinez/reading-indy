import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, authenticated }) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const handleChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    login({ user });
  };

  if (authenticated) {
    return <Redirect to="/account" />;
  }

  return (
    <div className="auth-form-div">
      <div className="toggle-div-2">
        <h2>
          <i className="fas fa-users"> </i> Log in!
        </h2>
      </div>
      <form className="form border" onSubmit={handleSubmit}>
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
          Log in!
        </button>
      </form>
      <div className="toggle-div">
        <Link to="/signup" className="toggle-link">
          Dont have an account ?
        </Link>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  authenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
