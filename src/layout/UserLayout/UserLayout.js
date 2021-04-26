import React from "react";
import Header from "../../components/User/Header";

import UserBody from "./partials/body";

export const UserLayout = ({ children }) => {
  return (
    <div className="slo">
      <Header />

      <UserBody style={{ position: "relative" }} content={children} />
    </div>
  );
};
