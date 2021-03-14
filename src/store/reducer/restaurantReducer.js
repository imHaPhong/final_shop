import { addListRestaurant } from "../action/restaurantAction/restaurantActionType";

export const restaurantReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case addListRestaurant:
      return (state = payload);
    default:
      return state;
  }
};
