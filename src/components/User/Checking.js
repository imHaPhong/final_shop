import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Button, Icon, Timeline } from "rsuite";
import Header from "./Header";
import { userGetOderInfo } from "../../middlerware/userMiddlerware";
import { Link } from "react-router-dom";
import OderSubItem from "../Restaurant/OderSubItem";

const Checking = ({ userGetOderInfo, user }) => {
  const { id } = useParams();

  const [oder, setOder] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await userGetOderInfo(id);
      setOder(data);
    };
    getData();
  }, []);

  console.log(oder);

  return (
    <>
      <Header />
      {oder && (
        <div className="checking-cotainer">
          <div className="checing">
            {/* <div className="checking-headear">
              <span>
                <Icon icon="angle-left" />
                Back
              </span>
              <span>ID {oder._id}</span>
            </div>
            <div className="checking-status">
              <span>
                <Icon icon="credit-card" />
              </span>
              <span className="checking-d"></span>
              <span>
                <Icon icon="money" />
              </span>
              <span className="checking-d"></span>
              <span>
                <Icon icon="truck" />
              </span>
              <span className="checking-d"></span>
              <span>
                <Icon icon="dropbox" />
              </span>
              <span className="checking-d"></span>

              <span>
                <Icon icon="star-o" />
              </span>
            </div> */}
            <span className="c-backBtn">
              <Link to="/user/oder">
                <Icon icon="angle-left" />
                Back
              </Link>
            </span>
            <div className="checking-address">
              <div className="c-addressTitle">Delivery address</div>
              <div className="c-userName">{user.username}</div>
              <div className="c-phoneNumber ">(+84) 962694289</div>
              <div className="c-address">{oder.deliveryAddress}</div>
            </div>
            <div className="checking-info">
              <span className="checking-info-title">Package 1</span>
              <div className="checking-info-cotnainer">
                <div className="checking-info-left">
                  Giao Hàng Tiết Kiệm 746068814
                </div>
                <div className="checking-info-right">
                  <Timeline>
                    {oder.logs.reverse().map((el) => (
                      <Timeline.Item time={new Date(el.time).toLocaleString()}>
                        <span>{el.msg}</span>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </div>
              </div>
            </div>
            <div className="c-listDish">
              <div className="c-restaurantInfo">
                <div className="c-restaurantAvt">
                  <img
                    src="https://cf.shopee.vn/file/0ab9cf72b4cbdfccb40a122aa8ebcbf9_tn"
                    alt=""
                  />
                </div>
                <div className="c-restaurantName">tiemmaimeo1987</div>
                <div className="c-restauranGoTo">
                  <Link>
                    <Button size="xs">
                      <Icon icon="archive" />
                      Go to restaurant
                    </Button>
                  </Link>
                </div>
              </div>
              {oder && oder.dish.map((el) => <OderSubItem subData={el} />)}
              <div className="c-footer">
                {oder.discount > 0 && (
                  <span className="c-footer-item">
                    <span className="c-footer-title">Total</span>
                    <span className="c-footer-total"> {oder.total}</span>
                  </span>
                )}
                {oder.discount > 0 && (
                  <span className="c-footer-item">
                    <span className="c-footer-title">Discount</span>
                    <span className="c-footer-total"> {oder.discount}</span>
                  </span>
                )}

                <span className="c-footer-item">
                  <span className="c-footer-title">Final total</span>
                  <span className="c-footer-total"> {oder.finaTotal}</span>
                </span>
                {/* <span className="c-footer-item">
                  <span className="c-footer-title">Payment type</span>
                  <span className="c-footer-total"> Thanh toan khi</span>
                </span> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { userGetOderInfo })(Checking);
