import React from "react";
import PropTypes from "prop-types";
import UserImg from "../../assets/img/bookworm.jpg";
import { Link } from "react-router-dom";

const Profile = ({
  profile: {
    user: { _id, name },
    location,
  },
}) => {
  return (
    <div className="form-info border mt-2 box">
      {/* <img src={UserImg} alt="user" className="user-img" /> */}
      <h1>{name}</h1>
      <h3>{location && <span>{location}</span>}</h3>
      <Link to={`/profile/${_id}`}>
        <button className="button button-add">Full Profile</button>
      </Link>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profile;
