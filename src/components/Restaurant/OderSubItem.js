import React from "react";
import NumberFormat from "react-number-format";

const OderSubItem = ({ subData }) => {
  return (
    <>
      <div className="oi-list-item">
        <span
          style={{ minWidth: "30%", display: "flex", alignItems: "center" }}
        >
          <img src={subData.img} alt="" />
          <span style={{ marginLeft: "3rem", display: "inline-block" }}>
            <span>{subData.name}</span>
            <span className="oi-qtn">x {subData.qtn}</span>
          </span>
        </span>
        <span className="ol-list-item-price">
        <NumberFormat value={subData.price} displayType={'text'} thousandSeparator={true} /> đ
        </span>
      </div>
    </>
  );
};

export default OderSubItem;
