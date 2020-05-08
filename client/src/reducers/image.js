import {
  UPLOADED_SUCESS,
  UPLOADED_FAIL,
  PHOTO_ERROR,
  GET_PHOTO,
} from "../actions/types";

const initialState = {
  image: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPLOADED_SUCESS:
    case GET_PHOTO:
      return {
        ...state,
        image: payload,
      };
    case UPLOADED_FAIL:
    case PHOTO_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}
