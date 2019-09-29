import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_REVIEWS,
  REVIEW_ERROR,
  DELETE_REVIEW,
  ADD_REVIEW,
  GET_REVIEW,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "./types";

export const getReviews = () => async dispatch => {
  try {
    const res = await axios.get("/api/review");

    dispatch({ type: GET_REVIEWS, payload: res.data });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteReview = id => async dispatch => {
  try {
    await axios.delete(`/api/review/${id}`);

    dispatch({ type: DELETE_REVIEW, payload: id });
    dispatch(setAlert("review removed", "danger"));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addReview = review => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`/api/review`, review, config);

    dispatch({ type: ADD_REVIEW, payload: res.data });
    dispatch(setAlert("review added", "success"));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getReview = id => async dispatch => {
  try {
    const res = await axios.get(`/api/review/${id}`);

    dispatch({ type: GET_REVIEW, payload: res.data });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addComment = (reviewId, comment) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/review/comment/${reviewId}`,
      comment,
      config
    );

    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(setAlert("Comment added", "success"));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteComment = (reviewId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/review/comment/${reviewId}/${commentId}`);

    dispatch({ type: REMOVE_COMMENT, payload: commentId });
    dispatch(setAlert("Comment deleted", "success"));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
