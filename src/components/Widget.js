import React from "react";
import Hashtag from "./Hashtag";

const Widget = ({ title, data }) => {
  return (
    <div className="boder hashtag">
      <div className="hashtag-header">{title}</div>
      <div className="breakline"></div>
      <div className="hashtag-list">
        <Hashtag text="#60bin" />
        <Hashtag text="#60binn" />
        <Hashtag text="#atamas" />
        <Hashtag text="#dasdasdas" />
      </div>
    </div>
  );
};

export default Widget;
