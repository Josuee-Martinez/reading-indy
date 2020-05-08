import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { upLoad } from "../../actions/image";

const Image = ({ Image, upLoad }) => {
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
    upLoad(formData);
  };

  return (
    // <form onSubmit={onSubmit} className="form left-align">
    //   {/* <h2>
    //       <i className="far fa-address-card"></i> Upload a photo.
    //     </h2> */}
    //   <div className="custom-file mb-4">
    //     <input
    //       type="file"
    //       name="file"
    //       className="custom-file-input"
    //       onChange={onChange}
    //     />
    //   </div>

    //   <input type="submit" value="Upload" className="button button-add" />
    // </form>
    <form onSubmit={onSubmit} className="form-info left-align">
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
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

const mapStateToProps = (state) => ({
  image: state.image,
});

Image.propTypes = {
  upLoad: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { upLoad })(withRouter(Image));
