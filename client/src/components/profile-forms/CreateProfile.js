import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [profile, setProfile] = useState({
    location: "",
    favoriteGenre: "",
    bio: "",
    favoriteAuthor: ""
  });

  const { location, favoriteGenre, bio, favoriteAuthor } = profile;

  const handleChange = e =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    createProfile(profile, history);
  };

  return (
    <div className="centered-content">
      <form className="form left-align" onSubmit={handleSubmit}>
        <h2>
          <i className="far fa-address-card"></i> Create your profile.
        </h2>
        <input
          className="input"
          type="text"
          placeholder="Location"
          name="location"
          value={location}
          onChange={handleChange}
        />
        <small>( Indianapolis, Carmel, Fishers etc... ) </small>
        <br />
        <input
          className="input"
          type="text"
          placeholder="Favorite Genre"
          name="favoriteGenre"
          value={favoriteGenre}
          onChange={handleChange}
        />
        <small>( Fantasy, YA, Distopia, Philosophy etc... ) </small>
        <br />
        <input
          className="input"
          type="text"
          placeholder="Favorite Author"
          name="favoriteAuthor"
          value={favoriteAuthor}
          onChange={handleChange}
        />
        <small>( Jk Rowling, Orwell, Emerson etc... ) </small>
        <input
          className="input"
          type="text"
          placeholder="Bio"
          name="bio"
          value={bio}
          onChange={handleChange}
        />
        <small>Add a bio </small>
        <br />
        <button className="button button-add" type="submit">
          Create Profile
        </button>
      </form>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
