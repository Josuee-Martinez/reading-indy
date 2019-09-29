import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import ProfileInfo from "./ProfileInfo";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <div className="centered-content">
      {profile === null || loading ? (
        ""
      ) : (
        <Fragment>
          <div>
            <ProfileInfo profile={profile} />
            {/* <ProfileAbout profile={profile} /> */}
          </div>
          <div className="mb-2">
            <Link to="/profiles">
              <button className="button button-add">Back to profiles</button>
            </Link>
            {auth.authenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to="/edit-profile">
                  <button className="button button-add">Edit profile</button>
                </Link>
              )}
          </div>
        </Fragment>
      )}
    </div>
  );
};
Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
