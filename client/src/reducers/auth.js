import {
  REGISTER_SUCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT
} from "../actions/types";

const initalState = {
  token: localStorage.getItem("token"),
  authenticated: null,
  loading: true,
  user: null
};

export default function(state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCESS:
    case LOGIN_SUCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        authenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case DELETE_ACCOUNT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        authenticated: false,
        loading: false
      };
    case USER_LOADED:
      return {
        ...state,
        authenticated: true,
        loading: false,
        user: payload
      };
    default:
      return state;
  }
}
