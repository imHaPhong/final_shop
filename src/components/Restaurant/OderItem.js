import React from "react";
import { Icon } from "rsuite";
import OderSubItem from "./OderSubItem";
import TimeAgo from "react-timeago";
import { connect } from "react-redux";
import { change2Processing } from "../../middlerware/restaurantMiddleware";

const OderItem = ({ setData, oderData, change2Processing }) => {
  const userClickHandler = (id) => {
    setData((p) => p.filter((el) => el._id !== id));
    change2Processing({ oId: id });
  };

  return (
    <div className="oi-containerx">
      <span className="oi-title">
        <span className="oi-title-header">
          <span>Oder: {oderData._id}</span>
          <span>
          <Icon icon="close" onClick={() => userClickHandler(oderData._id)} />
          <Icon icon="check" onClick={() => userClickHandler(oderData._id)} />
          </span>
        </span>

        <span>
          Time oder: <TimeAgo date={oderData.time} />{" "}
        </span>
      </span>
      <div className="oi-list-oder">
        {oderData.dish.map((el, index) => (
          <OderSubItem key={index} subData={el} />
        ))}
      </div>
    </div>
  );
};

export default connect(null, { change2Processing })(OderItem);
