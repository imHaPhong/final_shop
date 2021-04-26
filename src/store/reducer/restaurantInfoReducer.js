
const INIT_STATE = {
    isLogin: false,
}

export const restaurantInfoReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return {...state,
      isLogin: true};
    case "LOGOUT":
      return {...state,
        isLogin: false};       
       default:
      return state;
  }
};
