import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadProfilePhoto } from "../../actions/profile";

const Image = ({ uploadProfilePhoto }) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    uploadProfilePhoto(formData);
  };

  return (
    <form onSubmit={onSubmit} className="profile-user-info left-align">
      <h2>
        <i className="far fa-address-card"></i> Upload a profile picture.
      </h2>
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          name="file"
          onChange={onChange}
        />
        <label className="custom-file-label" htmlFor="customFile">
          {filename}
        </label>
      </div>

      <input type="submit" value="Upload" className="button button-add" />
    </form>
  );
};

Image.propTypes = {
  uploadProfilePhoto: PropTypes.func.isRequired,
};

export default connect(null, { uploadProfilePhoto })(withRouter(Image));
