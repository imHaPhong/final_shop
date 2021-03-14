import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import {
  Alert,
  Col,
  FormGroup,
  Grid,
  Icon,
  Input,
  Modal,
  Radio,
  RadioGroup,
  Row,
} from "rsuite";
import { getPreOderAction } from "../store/action/oderAction/oderAction";
import DishItem from "./DishItem";
import Header from "./Header";
import OrderItem from "./OrderItem";
import {
  getRestaurantInfo,
  createrOder,
  deletePreOder,
} from "../middlerware/userMiddlerware";
import MyApp from "./Payal";

const FoodDetail = ({
  deletePreOder,
  user,
  preOder,
  getRestaurantInfo,
  getPreOderAction,
  createrOder,
}) => {
  var total = 0;

  let { id } = useParams();

  const [restaurantData, setRestaurantData] = useState({
    restaurantName: "",
    address: "",
    menu: [],
  });

  const [paymentType, setPaymentType] = useState("");

  const onError = () => {};

  const onCancel = () => {};

  const onSuccess = () => {
    console.log("vao day");
    setOpen(false);
    deletePreOder();
    createrOder({ rId: id, dish: preOder, total });
    Alert.success("Oder success", 3000);
  };

  const onUserOder = () => {
    if (preOder.length === 0) {
      return Alert.warning("You need choose dish");
    }
    setOpen(true);
  };

  const userPayment = () => {
    if (paymentType === "") {
      return Alert.error("You need choose payment", 3000);
    }
    if (paymentType === "Payal") {
      return;
    }
    deletePreOder();
    setOpen(false);
    createrOder({ rId: id, dish: preOder, total });
    Alert.success("Oder success", 3000);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getRestaurantInfo(id);
      setRestaurantData(data);
    };
    getData();
    getPreOderAction(id);
  }, []);
  preOder.map((el) => {
    total += el.price * el.qtn;
  });

  const [open, setOpen] = useState(false);

  const setIsOpen = () => {
    setOpen(true);
  };
  const setIsClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="modal-center">
        <Modal show={open} onHide={setIsClose}>
          <Modal.Title>Create oder</Modal.Title>
          <Modal.Body>
            <div>
              <span className="co-title">List dish</span>
              {preOder.map((el, index) => (
                <OrderItem key={index} value={el} isEdit={false} />
              ))}
            </div>
            <div>
              <span className="co-title">nhap dia chi giao hang</span>
              <div className="userAddress-list">
                {user.userAddress.map((el) => (
                  <span className="userAddress-item itemActive">
                    <Icon icon="check" />
                    {el}
                  </span>
                ))}

                {/* <span className="">
                  <Input />
                  <Icon icon="check" />
                </span> */}
              </div>
            </div>
            <div className="mt-2">
              <span className="co-title">Voucher</span>
              <Input type="text" />
            </div>
            <div className="mt-2">
              <FormGroup controlId="radioList">
                <RadioGroup
                  name="radioList"
                  onChange={(e) => setPaymentType(e)}
                >
                  <span className="co-title">Chon hinh thuc thanh toan</span>
                  <Radio value="COD">Thanh toan khi nhan hang</Radio>
                  <Radio value="Payal">Payal</Radio>
                </RadioGroup>
              </FormGroup>
            </div>
          </Modal.Body>
          <Modal.Body>
            <div className="co-foodter">
              <span className="co-price">
                <span className="co-price-title">Tong thanh toan</span>
                <span className="co-totalPrice">{total}</span>
              </span>
              {paymentType === "Payal" ? (
                <MyApp
                  total={total}
                  onSuccess={onSuccess}
                  onCancel={onCancel}
                  onError={onError}
                />
              ) : (
                <span className="co-btn" onClick={userPayment}>
                  Oder
                </span>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <Header />
      <div className="fd-container">
        <div className="fd-hero">
          <div className="fd-hero-img">
            <img
              src="https://images.foody.vn/res/g76/758862/prof/s640x400/foody-upload-api-foody-mobile-thuy-beo-jpg-180713113040.jpg"
              alt="food detail"
            />
          </div>
          <div className="fd-hero-detail">
            <div>
              <span className="fd-name">{restaurantData.restaurantName}</span>
              <span className="fd-address">{restaurantData.address}</span>
              <div className="fd-rating">
                <Icon icon="star" />
                <Icon icon="star" />
                <div className="rating-count">100+</div>
              </div>
              <div className="fd-view-review">View review</div>
              <div className="fd-detail">
                <span className="fd-active">
                  <span className="dot"></span>
                  <span>Open</span>
                </span>
                <span className="fd-time-open">
                  <Icon icon="clock-o" />
                  8:00 - 9:00
                </span>
              </div>
            </div>

            <div className="fd-hero-detail-footer">
              <span className="fd-detail_title">Prepare</span>
              <span>12 Min</span>
            </div>
          </div>
        </div>
      </div>
      <div className="fd-m-container">
        <div className="fd-menu">
          <div className="fd-menu-title">Menu</div>
          <div className="fd-menu-content">
            <Row gutter={16}>
              <Col md={5} className="b">
                <div className="fd-menu-left">
                  <ul>
                    {restaurantData &&
                      restaurantData.menu.map((el) => <li>{el.menuTitle}</li>)}
                  </ul>
                </div>
              </Col>
              <Col md={14} className="b">
                <div className="db-menu-center">
                  <div className="input-container">
                    <Icon icon="search" />
                    <input type="text" placeholder="Search dish in menu" />
                  </div>
                  <div className="list-dish">
                    {restaurantData &&
                      restaurantData.menu.map((el) => {
                        return (
                          <>
                            <span className="list-dish-title">
                              {el.menuTitle}
                            </span>
                            {el.items.map((item) => {
                              return <DishItem data={item} />;
                            })}
                          </>
                        );
                      })}
                  </div>
                </div>
              </Col>
              <Col md={5} className="b">
                <div className="fd-menu-right">
                  <div className="fd-right-header ">
                    <div className="fd-right-user">
                      <img src={user.uAvatar} alt="" />
                      <span>{user.username}</span>
                    </div>
                    <span>{preOder.length} mon</span>
                  </div>
                  <div>
                    {preOder.map((el, index) => (
                      <OrderItem key={index} value={el} />
                    ))}
                  </div>
                  <div className="fd-total">
                    <div>Total</div>
                    <span>{total}</span>
                  </div>
                  <div
                    className={`fd-order-now ${
                      preOder.length === 0 ? "btn-disable" : ""
                    }`}
                    onClick={onUserOder}
                  >
                    <Icon icon="check-circle" /> Oder Now
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    preOder: state.preOder,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  createrOder,
  getPreOderAction,
  getRestaurantInfo,
  deletePreOder,
})(FoodDetail);
