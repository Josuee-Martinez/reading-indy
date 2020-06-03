import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Home = ({ authenticated }) => {
  if (authenticated) {
    return <Redirect to="/account" />;
  }
  return (
    <Fragment>
      <div className="landing-section">
        <div className="landing">
          <h1 className="landing-heading">Welcome to Reading Indy.</h1>
          <p className="landing-paragraph">
            Join the Indianapolis reading community!
          </p>
          <Link to="/signup">
            <button className="btn">Sign up!</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  authenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(Home);
