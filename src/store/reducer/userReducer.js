import { UserInfo, UserLogout } from "../action/userAction/useractionType";

const INITIAL_STATE = {
  uId: "",
  uAvatar: "",
  username: "",
  userAddress: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case UserInfo:
      return {
        ...state,
        uId: payload._id,
        uAvatar: payload.avatar,
        username: payload.userName,
        userAddress: [...INITIAL_STATE.userAddress, ...(payload.address || [])],
      };
    case UserLogout:
      return {
        ...state,
        INITIAL_STATE,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
