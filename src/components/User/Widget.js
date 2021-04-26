import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Hashtag from "./Hashtag";
import { getHashTag } from "../../middlerware/userMiddlerware";

const Widget = ({ title, data, getHashTag }) => {
  const defaulValue = Array(getHashTag.length).fill(false);

  const [arr, setArr] = useState(defaulValue);

  const [tag, setTag] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const tags = await getHashTag();
      console.log(tags);
      setTag(tags);
    };
    getData();
  }, []);

  return (
    <div className="boder hashtag">
      <div className="hashtag-header">{title}</div>
      <div className="breakline"></div>
      <div className="hashtag-list">
        <Hashtag text="All" />
        {tag &&
          tag.map((el, index) => (
            <Hashtag text={el} index={index} arr={arr} setArr={setArr} />
          ))}
      </div>
    </div>
  );
};

export default connect(null, { getHashTag })(Widget);
