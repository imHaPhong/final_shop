import {
  IsLogin,
  LoginFail,
  LoginProcess,
  LoginSucess,
} from "./authActionTypes";

export const loginProcess = () => {
  return {
    type: LoginProcess,
  };
};

export const loginSucess = (user) => {
  return {
    type: LoginSucess,
    payload: user,
  };
};
export const loginFail = (err) => {
  return {
    type: LoginFail,
    payload: err,
  };
};

export const isLogin = () => {
  return {
    type: IsLogin,
  };
};
