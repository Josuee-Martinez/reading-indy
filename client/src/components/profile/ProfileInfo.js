import React from "react";
import PropTypes from "prop-types";
import UserImg from "../../assets/img/bookworm.jpg";

const ProfileInfo = ({
  profile: {
    location,
    bio,
    favoriteGenre,
    favoriteAuthor,
    user: { name }
  }
}) => {
  return (
    <div className="mt-2 mb-2">
      <div className="form border">
        <img src={UserImg} alt="user" className="user-img" />
        <h1>{name}</h1>
        <p>{location}</p>
      </div>
      <div className="form border">
        <h2>Favorite Genre.</h2>
        <p>{favoriteGenre}</p>
      </div>
      <div className="form border">
        <h2>Favorite Author</h2>
        <p>{favoriteAuthor}</p>
      </div>
      <div className="form border">
        <h2>{name.trim().split(" ")[0]}'s bio</h2>
        <p>{bio}</p>
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileInfo;
