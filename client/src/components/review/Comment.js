import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserImg from "../../assets/img/bookworm.jpg";
import Moment from "react-moment";
import { deleteComment } from "../../actions/review";

const Comment = ({
  reviewId,
  comment: { _id, review, name, user, date },
  auth,
  deleteComment
}) => {
  return (
    <Fragment>
      <div className="form border">
        <Link to={`/profile/${user}`}>
          <img src={UserImg} alt="cool pic" className="user-img" />
          <h2>{name}</h2>
        </Link>
      </div>
      <div className="form border mb-2">
        <h2>Comment:</h2>
        <p>{review}</p>
        <p>
          <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            className="button danger"
            onClick={e => deleteComment(reviewId, _id)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        )}
      </div>
    </Fragment>
  );
};

Comment.propTypes = {
  reviewId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth
});

export default connect(
  mapStatetoProps,
  { deleteComment }
)(Comment);
