import React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import OderSubItem from "../Restaurant/OderSubItem";

const UserOderItem = ({ oderData }) => {
  console.log(oderData);
  return (
    <div className="u-oder-container">
      <div className="u-oder-header">
        <span className="u-oderLeft">
          <span>Oder Id: {oderData._id}</span>
        </span>
        <span className="u-oderRight">
          <span>
            <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
              Time oder:{" "}
            </span>
            {(new Date(oderData.time)).toLocaleTimeString()}{" "} {(new Date(oderData.time)).toLocaleDateString()}
          </span>
        </span>
      </div>

      <div className="u-listOder">
        {oderData.dish.map((el, index) => {
          return <OderSubItem key={index} subData={el} />;
        })}
      </div>
      <div className="u-listOder-footer">
        <span className="u-listOder-footer-total">
          Total: <span className="ul-total-price">
         
            <NumberFormat value={oderData.finaTotal} displayType={'text'} thousandSeparator={true} /> đ

            </span>
        </span>
        <span>
          <Link to={`/user/checking/${oderData._id}`}>
            <span className="btn-listOder">Oder info</span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default UserOderItem;
