import {
  IsLogin,
  LoginFail,
  LoginProcess,
  LoginSucess,
} from "../action/authAction/authActionTypes";

const INTIAL_STATE = {
  err: "",
  loading: false,
  accessToken: "" || localStorage.getItem("auth_token"),
  auth: false,
};

export const authReducer = (state = INTIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case LoginProcess:
      return {
        ...state,
        loading: true,
      };
    case LoginSucess:
      return {
        ...state,
        loading: false,
        accessToken: payload.token,
        auth: true,
      };
    case LoginFail:
      return {
        ...state,
        loading: false,
        err: payload,
      };
    case IsLogin:
      return {
        ...state,
        auth: true,
      };
    default:
      return { ...state };
  }
};
