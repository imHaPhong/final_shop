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
  InputGroup,
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
import { useMediaQuery } from "../utilities/custom-hooks/useMediaQuery";
import MDishItem from "./MDishItem";

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

  const [address, setAddress] = useState([]);
  const listAddress = [
    ...user.userAddress.map((el) => {
      return { title: el, isSelect: false };
    }),
  ];
  useEffect(() => {
    setAddress(listAddress);
  }, [user]);

  const onError = () => {};

  const onCancel = () => {};

  const onSuccess = () => {
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

    const deliveryAddress = address.filter((el) => el.isSelect === true);
    if (!deliveryAddress) {
      return Alert.error("User must choose address", 3000);
    }
    createrOder({
      rId: id,
      dish: preOder,
      total,
      deliveryAddress: deliveryAddress[0].title,
    });
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

  const isMoblie = useMediaQuery("(max-width: 992px)");

  const [menuSetting, setMenuSetting] = useState({
    isImgView: false,
    search: false,
  });
  const [rawData, setRawData] = useState(restaurantData);

  useEffect(() => {
    setRawData(restaurantData);
  }, [restaurantData]);
  const userSearchDish = (e) => {
    if (e === "") {
      return setRawData(restaurantData);
    } else {
      let subMenuList = [...rawData.menu];

      let result = subMenuList.map((el) => {
        var d = el.items.filter((i) => i.name.includes(e));
        var dat = { _id: el._id, menuTitle: el.menuTitle, items: d };
        return dat;
      });
      setRawData((p) => ({
        ...p,
        menu: result,
      }));
    }
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
                {address.map((el, index) => (
                  <span
                    key={index}
                    className="userAddress-item itemActive"
                    onClick={() => {
                      var a = listAddress;
                      a[index].isSelect = true;
                      setAddress(a);
                    }}
                  >
                    {el.isSelect && <Icon icon="check" />}
                    {el.title}
                  </span>
                ))}
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
      {!isMoblie && (
        <div className="fd-m-container">
          <div className="fd-menu">
            <div className="fd-menu-title">Menu</div>
            <div className="fd-menu-content">
              <Row gutter={16}>
                <Col md={5} className="b">
                  <div className="fd-menu-left">
                    <ul>
                      {restaurantData &&
                        restaurantData.menu.map((el, index) => (
                          <li key={index}>{el.menuTitle}</li>
                        ))}
                    </ul>
                  </div>
                </Col>
                <Col md={14} className="b">
                  <div className="db-menu-center">
                    <div className="input-container">
                      <Icon icon="search" />
                      <input
                        type="text"
                        placeholder="Search dish in menu"
                        onChange={(e) => userSearchDish(e.target.value)}
                      />
                    </div>
                    <div className="list-dish">
                      {rawData &&
                        rawData.menu.map((el, index) => {
                          return (
                            <>
                              <span className="list-dish-title" key={index}>
                                {el.menuTitle}
                              </span>
                              {el.items.map((item, indexz) => {
                                return <DishItem key={indexz} data={item} />;
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
      )}
      {isMoblie && (
        <div className="m-fd-container">
          <div className="settingMenu">
            <span className="settingMenu-left">All</span>
            <span className="settingMenu-right">
              <Icon
                icon="squares"
                className={`${!menuSetting.isImgView ? `active` : ``}`}
                onClick={() =>
                  setMenuSetting((p) => ({
                    ...p,
                    isImgView: false,
                  }))
                }
              />
              <Icon
                icon="th-large"
                className={`${menuSetting.isImgView ? `active` : ``}`}
                onClick={() =>
                  setMenuSetting((p) => ({
                    ...p,
                    isImgView: true,
                  }))
                }
              />
              <Icon
                icon="search"
                onClick={() =>
                  setMenuSetting((p) => ({
                    ...p,
                    search: !p.search,
                  }))
                }
              />
            </span>
          </div>
          {menuSetting.search && (
            <InputGroup>
              <Input placeholder="Search dish" onChange={userSearchDish} />
              <InputGroup.Addon>
                <Icon icon="search" />
              </InputGroup.Addon>
            </InputGroup>
          )}
          <div>
            {rawData &&
              rawData.menu.map((el, index) => {
                if (el.items.length > 0) {
                  return (
                    <MDishItem
                      title={el.menuTitle}
                      isList={menuSetting.isImgView}
                      data={el}
                      menuQtn={el.items.length}
                    />
                  );
                }
              })}
          </div>
        </div>
      )}
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
