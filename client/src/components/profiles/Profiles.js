import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
// import { getProfil } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
    // console.log();
  }, [getProfiles]);
  return (
    <div className="centered-content mt-2 mb-2">
      {loading ? (
        ""
      ) : (
        <Fragment>
          <h1>
            <i className="far fa-address-card"> </i> Reading Indy members
          </h1>
          <div>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Profile key={profile._id} profile={profile} />
              ))
            ) : (
              <h3>no users found</h3>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
