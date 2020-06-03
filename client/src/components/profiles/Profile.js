import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Profile = ({
  profile: {
    user: { _id, name },
    location,
    photo,
  },
}) => {
  return (
    <div className="mt-2 mb-2">
      <div className="form-info border">
        <img src={`/uploads/${photo}`} alt="user" className="user-img" />
        <h1>{name}</h1>

        <h3>{location && <span>{location}</span>}</h3>
        <Link to={`/profile/${_id}`}>
          <button className="button button-add">View Profile</button>
        </Link>
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profile;
