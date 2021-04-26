import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { postReducer } from "./postReducer";
import { oderReducer } from "./preOderReducer";
import { managerOderReducer } from "./managerOderReducer";
import userReducer from "./userReducer";
import { restaurantReducer } from "./restaurantReducer";
import { restaurantInfoReducer } from "./restaurantInfoReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  listPost: postReducer,
  preOder: oderReducer,
  oderInfo: managerOderReducer,
  listRestaurant: restaurantReducer,
  restaurantInfo: restaurantInfoReducer,
});
