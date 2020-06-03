import React from "react";
import PropTypes from "prop-types";

const ProfileInfo = ({
  profile: {
    location,
    bio,
    favoriteGenre,
    favoriteAuthor,
    photo,
    user: { name },
  },
}) => {
  return (
    <div className="mt-2 mb-2">
      <div className="form-info border">
        <div className="centered-content">
          <img src={`/uploads/${photo}`} alt="" className="user-img" />
          <h1 className="profile-heading">{name}</h1>
        </div>
      </div>
      <div className="form-info border">
        <h2 className="profile-heading">Location:</h2>
        <p>{location}</p>
      </div>
      <div className="form-info border">
        <h2 className="profile-heading">Favorite Genre:</h2>
        <p>{favoriteGenre}</p>
      </div>
      <div className="form-info border">
        <h2 className="profile-heading">Favorite Author:</h2>
        <p>{favoriteAuthor}</p>
      </div>
      <div className="form-info border">
        <h2 className="profile-heading">{name.trim().split(" ")[0]}'s bio:</h2>
        <p>{bio}</p>
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileInfo;
