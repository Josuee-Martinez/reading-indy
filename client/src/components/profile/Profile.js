import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import { getImageById } from "../../actions/image";

import ProfileInfo from "./ProfileInfo";

const Profile = ({
  getProfileById,
  getImageById,
  profile: { profile, loading },
  image: { image },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getImageById(match.params.id);
    console.log(image);
  }, [getProfileById, getImageById, match.params.id]);

  return (
    <Fragment>
      <div className="centered-content">
        {profile === null || loading ? (
          ""
        ) : (
          <Fragment>
            <div>
              <ProfileInfo profile={profile} image={image} />
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
      {/* <div>
        {image === null ? (
          ""
        ) : (
          <div className="centered-content">
            <img src={image.filePath} alt="" />
          </div>
        )}
      </div> */}
    </Fragment>
  );
};
Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getImageById: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  image: state.image,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, getImageById })(
  Profile
);
