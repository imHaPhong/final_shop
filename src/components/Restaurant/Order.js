import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table } from "rsuite";
import { getOder } from "../../middlerware/restaurantMiddleware";
import OderItem from "./OderItem";
import { io } from "socket.io-client";
import { socket } from "../../config/socket";

const Order = ({ getOder, tabTitle, renderList }) => {
  const { Column, HeaderCell, Cell, Pagination } = Table;
  const [dataOder, setData] = useState([]);

  useEffect(() => {
    const data = async () => {
      const resData = await getOder();
      setData(resData);
    };
    data();
  }, []);
  useEffect(() => {
    socket.on("UpdateOder", (oderData) => {
      setData(dataOder.concat(oderData.oder));
    });
  });
  return (
    <div className="oder-container">
      <div>{tabTitle}</div>
      <div className="oi-container">
        {dataOder &&
          dataOder.map((el, index) => {
            if (el.status === renderList) {
              return <OderItem setData={setData} oderData={el} key={index} />;
            }
          })}
      </div>
    </div>
  );
};

export default connect(null, { getOder })(Order);
