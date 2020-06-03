import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getReviews } from "../../actions/review";
import Review from "./Review";
import AddReview from "./AddReview";

const Reviews = ({ getReviews, review: { reviews, loading } }) => {
  useEffect(() => {
    getReviews();
  }, [getReviews]);
  return loading ? (
    ""
  ) : (
    <div className="centered-content mt-2">
      <h1 className="member-heading">
        {" "}
        <i className="fas fa-book-reader"></i> Book Reviews
      </h1>
      <AddReview />
      <div>
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  getReviews: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review,
});

export default connect(mapStateToProps, { getReviews })(Reviews);
