import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";
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
  Rate,
  Row,
} from "rsuite";
import { getPreOderAction } from "../../store/action/oderAction/oderAction";
import DishItem from "./DishItem";
import Header from "./Header";
import OrderItem from "./OrderItem";
import {
  getRestaurantInfo,
  createrOder,
  deletePreOder,
  getOwnVoucher,
} from "../../middlerware/userMiddlerware";
import MyApp from "./Payal";
import { useMediaQuery } from "../../utilities/custom-hooks/useMediaQuery";
import MDishItem from "./MDishItem";
import { Link } from "react-router-dom";
import Voucher from "./Voucher";
import NumberFormat from "react-number-format";

const FoodDetail = ({
  deletePreOder,
  user,
  getOwnVoucher,
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
    avatar: "",
    timeAcitve: [],
    rating: 0,
    numberRating: 0,
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

  const [voucher, listVoucher] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getOwnVoucher();
      listVoucher(data);
    };
    getData();
  }, []);

  const [voucherId, setVoucherId] = useState();

  const [hasVoucher, setHasVoucher] = useState(false);
  const [voucherInfo, setVoucherInfo] = useState({
    discount: 0,
    tempTotal: 0,
    finalTotal: 0,
  });

  const setIdClickHandler = (id, maxDiscount, discount) => {
    var temp = voucherInfo.tempTotal * (discount / 100);
    if (temp > maxDiscount) {
      temp = maxDiscount;
    }
    setVoucherInfo({
      tempTotal: voucherInfo.tempTotal,
      discount: temp,
      finalTotal: voucherInfo.tempTotal - temp,
    });
    total = total - temp;
    setHasVoucher(true);
    setVoucherId(id);
  };
  const onError = () => {};

  const onCancel = () => {};

  const onSuccess = () => {
    setOpen(false);
    deletePreOder();
    createrOder({ rId: id, dish: preOder, total });
    setVoucherInfo({
      tempTotal: 0,
      discount: 0,
      finalTotal: 0,
    });
    Alert.success("Oder success", 3000);
  };

  const onUserOder = () => {
    if (preOder.length === 0) {
      return Alert.warning("You need choose dish");
    }
    setOpen(true);
  };

  const userPayment = () => {
    const deliveryAddress = address.filter((el) => el.isSelect === true);
    if (deliveryAddress.length <= 0) {
      return Alert.error("User must choose address", 3000);
    }
    if (paymentType === "") {
      return Alert.error("You need choose payment method", 3000);
    }
    if (paymentType === "Payal") {
      return;
    }
    deletePreOder();
    setOpen(false);

    createrOder({
      rId: id,
      dish: preOder,
      total,
      deliveryAddress: deliveryAddress[0].title,
      vId: voucherId || 0,
    });
    Alert.success(<a href="/user/oder">Oder success</a>, 100000, () =>
      console.log("Click")
    );
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getRestaurantInfo(id);
      setRestaurantData(data);
    };
    getData();
    getPreOderAction(id);
  }, []);
  useEffect(() => {
    var a = 0;
    preOder.map((el) => {
      if (id === el.rid) {
        a += el.price * el.qtn;
        setVoucherInfo((p) => ({ ...p, tempTotal: a }));
      }
    });
  }, [preOder]);
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
  console.log(voucherInfo);

  console.log(voucherInfo.finalTotal);
  return (
    <>
      <div className="modal-center">
        <Modal show={open} onHide={setIsClose}>
          <Modal.Title>Create oder</Modal.Title>
          <Modal.Body>
            <div>
              <span className="modal-header">
                <span className="co-title">List dish</span>
                {isMoblie && <Icon icon="close" onClick={setIsClose} />}
              </span>
              {preOder.map((el, index) => (
                <OrderItem key={index} value={el} isEdit={false} />
              ))}
            </div>
            <div>
              <span className="co-title">Select a shipping address</span>
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
            <div className="fd-voucher mt-2">
              <span className="co-title">Voucher</span>
              <span className="fd-listVoucher">
                <RadioGroup>
                  {voucher &&
                    voucher.map((el) => (
                      <Voucher
                        setIdClickHandler={setIdClickHandler}
                        isDisable={el.minBill > voucherInfo.tempTotal}
                        isCheck={true}
                        voucherData={el}
                      />
                    ))}
                </RadioGroup>
              </span>
            </div>
            <div className="mt-2">
              <FormGroup controlId="radioList">
                <RadioGroup
                  name="radioList"
                  onChange={(e) => setPaymentType(e)}
                >
                  <span className="co-title">Select a payment method</span>
                  <Radio value="COD">Payment on delivery</Radio>
                  <Radio value="Payal">Payal</Radio>
                </RadioGroup>
              </FormGroup>
            </div>
          </Modal.Body>
          <Modal.Body>
            <div className="co-foodter">
              <span className="co-price">
                <span className="co-price-title">Total</span>
                {!hasVoucher ? (
                  <span>
                    <NumberFormat
                      value={voucherInfo.tempTotal}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    <span className="current">đ</span>
                  </span>
                ) : (
                  <>
                    <span className="co-totalPrice">
                      <span>
                        <NumberFormat
                          value={voucherInfo.tempTotal}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        <span className="current">đ</span>
                      </span>
                    </span>

                    <div className="co-totalPrice">
                      <span>
                       - <NumberFormat
                          value={voucherInfo.discount}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        <span className="current">đ</span>
                      </span>
                    </div>
                    <div className="co-totalPrice">
                      <span>
                      <span style={{color:"black", fontSize: "2rem"}}>Total payment amount:</span> <NumberFormat
                          value={voucherInfo.finalTotal}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        <span className="current">đ</span>
                      </span>
                    </div>
                  </>
                )}
              </span>
              {paymentType === "Payal" ? (
                <MyApp
                  total={voucherInfo.finalTotal !== 0? voucherInfo.finalTotal : voucherInfo.tempTotal}
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
      {isMoblie ? (
        <div className="fd-container ">
          <div className="m-fd-hero">
            <img src={restaurantData.avatar} alt="" />
            <div className="m-fd-detail">
              <Link to="/user/listRestaurant">
                <Icon icon="angle-left" />
              </Link>
              <span>
                <span className="m-fd-name">
                  {restaurantData.restaurantName}
                </span>
                <span className="m-fd-addressContainer">
                  <span className="m-fd-address">{restaurantData.address}</span>

                  <span className="isOpen">
                    <Icon icon="circle" />
                    Open
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="fd-container">
          <div className="fd-hero">
            <div className="fd-hero-img">
              <img src={restaurantData.avatar} alt="food detail" />
            </div>
            <div className="fd-hero-detail">
              <div>
                <span className="fd-name">{restaurantData.restaurantName}</span>
                <span className="fd-address">{restaurantData.address}</span>
                <div className="fd-rating">
                  <Rate value={restaurantData.rating} allowHalf readOnly />
                  <div className="rating-count">
                    {restaurantData.numberRating}
                  </div>
                </div>
                <div className="fd-view-review">
                  <Link to={`/user/tag/${restaurantData.restaurantName}`}>
                    View review
                  </Link>
                </div>
                <div className="fd-detail">
                  <span className="fd-active">
                    <span className="dot"></span>
                    <span>Open</span>
                  </span>
                  <span className="fd-time-open">
                    <Icon icon="clock-o" />
                    {restaurantData.timeAcitve[0]} -{" "}
                    {restaurantData.timeAcitve[1]}
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
      )}

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
                      <span>{preOder.length} dish</span>
                    </div>
                    <div>
                      {preOder.map((el, index) => (
                        <OrderItem key={index} value={el} />
                      ))}
                    </div>
                    <div className="fd-total">
                      <div>Total</div>
                      <span>
                       {preOder.length > 0?  <NumberFormat
                          value={voucherInfo.tempTotal}
                          displayType={"text"}
                          thousandSeparator={true}
                        />:  <NumberFormat
                        value={0}
                        displayType={"text"}
                        thousandSeparator={true}
                      />}
                        <span className="current">đ</span>
                      </span>
                    </div>
                 {user.uId === "" ? <Link to="/login">
                  <div
                      className={`fd-order-now ${
                        preOder.length === 0 ? "btn-disable" : ""
                      }`}
                    >
                      <Icon icon="check-circle" /> Oder Now
                    </div>
                  </Link> : <div
                      className={`fd-order-now ${
                        preOder.length === 0 ? "btn-disable" : ""
                      }`}
                      onClick={onUserOder}
                    >
                      <Icon icon="check-circle" /> Oder Now
                    </div>}
                    
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
          {/* <div className="m-preOderCotainer">
            <div className="m-preOderTable">
              <div className="m-preOderHeader">
                <Icon icon="close" />
                Thuy Beo
                <span>xoa</span>
              </div>
              <div className="m-preOderInfo">
                <span>
                  <img src="" alt="" />
                  <span>Anh Tuan</span>
                </span>
                <span>
                  <span>1 phan</span> - 80000d
                </span>
              </div>
            </div>
          </div> */}
          <div style={{ width: "100%", height: "5vh" }}></div>
          {preOder.length > 0 && (
            <div className="m-preOderList">
              <span className="m-preOderList-right">
                <span className="m-preOderList-detail">
                  <Icon icon="inbox" />
                  <span className="qtn-preOder">{preOder.length}</span>
                </span>
                {!hasVoucher && (
                  <span style={{ fontWeight: "600", fontSize: "1.5rem" }}>
                     <NumberFormat
                          value={voucherInfo.tempTotal}
                          displayType={"text"}
                          thousandSeparator={true}
                        /> đ
                  </span>
                )}
                {hasVoucher && (
                  <span style={{ fontWeight: "600", fontSize: "1.5rem" }}>
                    {voucherInfo.discount}
                    {voucherInfo.finalTotal}
                  </span>
                )}
              </span>
              <span className="m-preOderList-left" onClick={onUserOder}>
                Order now <Icon icon="angle-right" />{" "}
              </span>
            </div>
          )}
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
  getOwnVoucher,
})(FoodDetail);
