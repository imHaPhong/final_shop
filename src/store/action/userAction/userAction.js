import { UserInfo, UserLogout } from "./useractionType";

export const userInfo = (user) => {
  return {
    type: UserInfo,
    payload: user,
  };
};

export const userLogout = () => {
  return {
    type: UserLogout,
  };
};
