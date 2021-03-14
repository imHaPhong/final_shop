import React, { useState } from "react";
import Header from "../../components/Restaurant/Header";
import Menu from "../../components/Restaurant/Menu";

const RestaurantLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mt-3">{children}</div>
    </div>
  );
};

export default RestaurantLayout;
