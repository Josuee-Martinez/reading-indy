import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/review";

const AddComment = ({ reviewId, addComment }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    addComment(reviewId, { comment });
  };

  return (
    <form onSubmit={e => handleSubmit(e)} className="form left-align">
      <textarea
        name="review"
        cols="30"
        rows="10"
        placeholder="Leave a comment"
        required
        className="input"
        value={comment}
        onChange={e => setComment(e.target.value)}
      ></textarea>
      <button type="submit" className="button button-add">
        Comment!
      </button>
    </form>
  );
};

AddComment.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(AddComment);
