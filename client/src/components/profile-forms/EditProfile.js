import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Image from "./Image";

import {
  createProfile,
  getCurrentProfile,
  deleteAccount,
} from "../../actions/profile";

const EditProfile = ({
  createProfile,
  getCurrentProfile,
  deleteAccount,
  profile: { profile, loading },
  history,
}) => {
  const [updatedProfile, setUpdatedProfile] = useState({
    location: "",
    favoriteGenre: "",
    bio: "",
    favoriteAuthor: "",
  });

  const { location, favoriteGenre, bio, favoriteAuthor } = updatedProfile;

  useEffect(() => {
    getCurrentProfile();

    setUpdatedProfile({
      location: loading || !profile.location ? "" : profile.location,
      favoriteGenre:
        loading || !profile.favoriteGenre ? "" : profile.favoriteGenre,
      bio: loading || !profile.bio ? "" : profile.bio,
      favoriteAuthor:
        loading || !profile.favoriteAuthor ? "" : profile.favoriteAuthor,
    });
  }, [loading, getCurrentProfile]);

  const handleChange = (e) =>
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProfile(updatedProfile, history, true);
  };

  return (
    <div className="centered-content">
      <Image />
      <form className="form-info left-align" onSubmit={handleSubmit}>
        <h2>
          <i className="far fa-address-card"></i> Edit your profile.
        </h2>
        <input
          className="input-info"
          type="text"
          placeholder="Location"
          name="location"
          value={location}
          onChange={handleChange}
        />
        <small>( Indianapolis, Carmel, Fishers etc... ) </small>
        <br />
        <input
          className="input-info"
          type="text"
          placeholder="Favorite Genre"
          name="favoriteGenre"
          value={favoriteGenre}
          onChange={handleChange}
        />
        <small>( Fantasy, YA, Distopia, Philosophy etc... ) </small>
        <br />
        <input
          className="input-info"
          type="text"
          placeholder="Favorite Author"
          name="favoriteAuthor"
          value={favoriteAuthor}
          onChange={handleChange}
        />
        <small>( Jk Rowling, Orwell, Emerson etc... ) </small>
        <input
          className="input-info"
          type="text"
          placeholder="Bio"
          name="bio"
          value={bio}
          onChange={handleChange}
        />
        <small>Add a bio </small>
        <br />
        <button className="button button-add" type="submit">
          Edit Profile
        </button>
      </form>
      <a href="#!" onClick={() => deleteAccount()}>
        {" "}
        <i className="fas fa-user-times button-delete"> Delete Account</i>
      </a>
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  deleteAccount,
})(withRouter(EditProfile));
