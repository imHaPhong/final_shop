import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import UserOderItem from "./UserOderItem";
import {
  getListOder,
  oderGetReceive,
  oderGetDeliver,
  oderGetProcessing,
  oderGetWaiting,
  getAllOder,
} from "../middlerware/userMiddlerware";
import { io } from "socket.io-client";
const UserOder = ({
  getListOder,
  oderGetReceive,
  oderGetDeliver,
  oderGetProcessing,
  oderGetWaiting,
  getAllOder,
  select,
  fetchData,
}) => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const resData = await getListOder();
      setListData(resData);
    };
    getAllOder();
    getData();
    const socket = io("https://tuanna-final.herokuapp.com/", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("change2Processing", (data) => {
      oderGetWaiting();
    });
  }, []);

  const userSelect = (index) => {
    switch (index) {
      case 0:
        return getAllOder();
      case 1:
        return oderGetWaiting();
      case 2:
        return oderGetProcessing();
      case 3:
        return oderGetDeliver();
      case 4:
        return oderGetReceive();

      default:
        return;
    }
  };

  return (
    <div>
      <Header />
      <div className="user-oder">
        <div className="u-oderHeader">
          <ul>
            {select.map((el, index) => {
              return (
                <li
                  key={index}
                  onClick={() => userSelect(index)}
                  className={`${el.active ? `active` : ``}`}
                >
                  {el.content}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="u-oderContainer">
          {fetchData &&
            fetchData.length > 0 &&
            fetchData.map((el, index) => (
              <UserOderItem key={index} oderData={el} />
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStatatoProps = (state) => {
  return {
    select: state.oderInfo.select,
    fetchData: state.oderInfo.data,
  };
};

export default connect(mapStatatoProps, {
  getListOder,
  getAllOder,
  oderGetWaiting,
  oderGetProcessing,
  oderGetDeliver,
  oderGetReceive,
})(UserOder);
