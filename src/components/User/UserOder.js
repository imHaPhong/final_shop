import React, { useEffect, useRef, useState } from "react";
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
} from "../../middlerware/userMiddlerware";
import { socket } from "../../config/socket";
import { Link } from "react-router-dom";

const UserOder = ({
  getListOder,
  oderGetReceive,
  oderGetDeliver,
  oderGetProcessing,
  oderGetWaiting,
  getAllOder,
  select,
  fetchData,
  user,
}) => {
  const [listData, setListData] = useState([]);
  const [oderList, setOderList] = useState();

  useEffect(() => {
    const getData = async () => {
      const getData = async () => {
        const resData = await getListOder();
        setListData(resData);
      };
      const data = await getAllOder();
      setOderList(data);
      getData();
      socket.on("change2Processing", async (data) => {
        oderGetWaiting();
        const datax = await getAllOder();
        setOderList(datax);
      });
    };
    getData();
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

  // const headerRef = useRef();

  // const [scrollOut, setIsScrollOut] = useState(false);

  // const listenToScroll = () => {
  //   if (headerRef.current) {
  //     if (document.documentElement.scrollTop > headerRef.current.offsetWidth) {
  //       setIsScrollOut(true);
  //     } else {
  //       setIsScrollOut(false);
  //     }
  //   }
  // };

  // window.addEventListener("scroll", listenToScroll);

  const changeText2State = (text) => {
    switch (text) {
      case "Wating":
        return 0;
      case "Processing":
        return 1;
      case "Delivery":
        return 2;
      case "Receive":
        return 3;
      default:
        return 4;
    }
  };

  const getQtn = (id, list) => {
    console.log(id, list);
    const qtn = list.filter((el) => el.status === id);
    return qtn.length;
  };

  return (
    <div>
      <Header />
      {user.uId !== "" ? (
        <div className="user-oder">
          <div className="u-oderHeader">
            <ul>
              {select.map((el, index) => {
                return (
                  <li
                    style={{ position: "relative" }}
                    key={index}
                    onClick={() => userSelect(index)}
                    className={`${el.active ? `active` : ``}`}
                  >
                    {el.content}
                    {el.content !== "All" &&
                      listData.length > 0 &&
                      getQtn(changeText2State(el.content), oderList) > 0 && (
                        <span className="oderInfo-qtn">
                          {getQtn(changeText2State(el.content), oderList)}
                        </span>
                      )}
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
      ) : (
        <div
          style={{
            display: "flex",
            height: "50vh",
            width: "100wh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", textAlign: "center" }}>
            <div style={{ textAlign: "center" }}>
              <h5>Must Log In to see this page</h5>
            </div>
            <Link to={"/user"}>Login here</Link>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStatatoProps = (state) => {
  return {
    user: state.user,
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
