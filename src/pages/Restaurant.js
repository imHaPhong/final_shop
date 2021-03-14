import React from "react";
import RestaurantLayout from "../layout/RestaurantLayout";

const Restaurant = ({ children }) => {
  return (
    <div>
      <RestaurantLayout>{children}</RestaurantLayout>
    </div>
  );
};

export default Restaurant;
