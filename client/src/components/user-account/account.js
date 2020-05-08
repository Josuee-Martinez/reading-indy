import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { getCurrentUserPhoto } from "../../actions/image";

import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";

const Account = ({
  getCurrentProfile,
  getCurrentUserPhoto,
  auth: { user },
  profile: { profile, loading },
  image: { image },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getCurrentUserPhoto();
  }, [getCurrentProfile, getCurrentUserPhoto]);

  return (
    <div className="centered-content mt-2">
      {profile !== null ? (
        <Fragment>
          <h1>
            Hey {user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
            , welcome to Reading Indy!
          </h1>

          <EditProfile />
        </Fragment>
      ) : (
        <Fragment>
          <h1>
            Hey {user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
            , welcome to Reading Indy!
          </h1>
          <p>Take a second to create your Reading Indy profile!</p>
          {/* <Link to="/create-profile">
            <button className="button">Create profile</button>
          </Link> */}
          <CreateProfile />
        </Fragment>
      )}
    </div>
  );
};

Account.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  image: state.image,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getCurrentUserPhoto,
})(Account);
