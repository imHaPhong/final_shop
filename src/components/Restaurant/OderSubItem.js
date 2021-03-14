import React from "react";

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
        <span className="ol-list-item-price">$ {subData.price}</span>
      </div>
    </>
  );
};

export default OderSubItem;
