import React from "react";
import { Link } from "react-router-dom";

const Hashtag = ({ text }) => {
  return (
    <div className="hashtag-item" onClick={() => console.log("click")}>
      <Link to={text !== "All" ? `/user/tag/${text}` : `/user`}>{text}</Link>
    </div>
  );
};

export default Hashtag;
