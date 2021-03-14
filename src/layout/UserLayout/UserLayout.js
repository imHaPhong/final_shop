import React from "react";
import Header from "../../components/Header";
import Post from "../../components/Post";
import Posts from "../../components/Posts";
import UserBody from "./partials/body";

export const UserLayout = ({ children }) => {
  return (
    <div className="slo">
      <Header />

      <UserBody style={{ position: "relative" }} content={children} />
    </div>
  );
};
