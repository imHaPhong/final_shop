import { addListRestaurant } from "./restaurantActionType";

export const getListRestaurantAction = (listRestaurant) => {
  return {
    type: addListRestaurant,
    payload: listRestaurant,
  };
};
