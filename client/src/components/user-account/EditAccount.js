import React from "react";
import { Link } from "react-router-dom";

const EditAccount = () => {
  return (
    <div>
      <Link to="/edit-profile">
        <button className="button">Edit profile</button>
      </Link>
    </div>
  );
};

export default EditAccount;
