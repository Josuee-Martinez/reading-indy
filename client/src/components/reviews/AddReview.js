import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addReview } from "../../actions/review";

const AddReview = ({ addReview }) => {
  const [bookReview, setBookReview] = useState({
    book: "",
    review: "",
  });

  const { book, review } = bookReview;

  const clearFields = () => {
    setBookReview({
      book: "",
      review: "",
    });
  };

  const handleChange = (e) => {
    setBookReview({ ...bookReview, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({ bookReview });
    clearFields();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="profile-user-info left-align"
    >
      <input
        type="text"
        name="book"
        className="input-info"
        placeholder="Enter a book to review"
        value={book}
        onChange={(e) => handleChange(e)}
      />
      <br />
      <textarea
        name="review"
        cols="30"
        rows="10"
        placeholder="Leave a review"
        required
        className="input-info"
        value={review}
        onChange={(e) => handleChange(e)}
      ></textarea>
      <button type="submit" className="button button-add">
        review!
      </button>
    </form>
  );
};

AddReview.propTypes = {
  addReview: PropTypes.func.isRequired,
};

export default connect(null, { addReview })(AddReview);
