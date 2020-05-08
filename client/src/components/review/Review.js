import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";
import Comment from "./Comment";

import { connect } from "react-redux";
import { getReview } from "../../actions/review";
import UserImg from "../../assets/img/bookworm.jpg";

const Review = ({ getReview, review: { review, loading }, match }) => {
  useEffect(() => {
    getReview(match.params.id);
  }, [getReview, match.params.id]);

  return loading || review === null ? (
    ""
  ) : (
    <div
      className="centered-content mt-2 
   mb-2"
    >
      <Link to="/reviews">
        <button className="button button-add">Back</button>
      </Link>
      <div className="form-info border mt-2">
        <Link to={`/profile/${review.user}`}>
          <img src={UserImg} alt="cool guy" className="user-img" />
          <h2>{review.name}</h2>
        </Link>
      </div>

      <div className="form-info border">
        <h2>Review:</h2>
        <p>{review.review}</p>
        <p>
          <Moment format="MM/DD/YYYY">{review.date}</Moment>
        </p>
      </div>
      <AddComment reviewId={review._id} />
      <div>
        {review.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} reviewId={review._id} />
        ))}
      </div>
    </div>
  );
};

Review.propTypes = {
  getReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review,
});

export default connect(mapStateToProps, { getReview })(Review);
