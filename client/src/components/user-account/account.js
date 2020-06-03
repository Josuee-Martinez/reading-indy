import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";

const Account = ({
  getCurrentProfile,

  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div className="centered-content mt-2">
      {profile !== null ? (
        <Fragment>
          <h1 className="member-heading">
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

          <CreateProfile />
        </Fragment>
      )}
    </div>
  );
};

Account.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
})(Account);
