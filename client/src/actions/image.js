import axios from "axios";
import { setAlert } from "./alert";

import {
  UPLOADED_FAIL,
  UPLOADED_SUCESS,
  GET_PHOTO,
  PHOTO_ERROR,
} from "./types";

export const upLoad = (image) => async (dispatch) => {
  try {
    const res = await axios.post("/api/image/upload", image);
    dispatch({ type: UPLOADED_SUCESS, payload: res.data });
    dispatch(setAlert("Photo uploaded!", "success"));
  } catch (error) {
    dispatch({ type: UPLOADED_FAIL });
  }
};

export const getCurrentUserPhoto = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/image/myphoto");
    dispatch({ type: GET_PHOTO, payload: res.data });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getImageById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/image/${userId}`);

    dispatch({
      type: GET_PHOTO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
