import React from "react";
import { connect } from "react-redux";
import { Icon } from "rsuite";
import {
  removePreOderAction,
  updatePreOderAction,
} from "../store/action/oderAction/oderAction";

const addToLocal = (data) => {
  var rawData = JSON.parse(localStorage.getItem("dish") || []);

  rawData = rawData.map((el) => {
    if (el.id === data.id) {
      el.qtn += 1;
    }
    return el;
  });
  localStorage.setItem("dish", JSON.stringify(rawData));
};

const removeToLocal = (data) => {
  var rawData = JSON.parse(localStorage.getItem("dish") || []);
  rawData = rawData.map((el, index) => {
    if (el.id === data.id && el.qtn > 0) {
      el.qtn -= 1;
    }
    if (el.qtn === 0) {
      return null;
    }
    return el;
  });
  rawData = rawData.filter((el) => el !== null);
  localStorage.setItem("dish", JSON.stringify(rawData));
};

const OrderItem = ({ value, isEdit = true, removePreOder, updatePreOder }) => {
  const clickHandler = (action, data) => {
    if (action === "Add") {
      updatePreOder(data);
      addToLocal(data);
    } else {
      removePreOder(data);
      removeToLocal(data);
    }
  };

  return (
    <div className="oder-item-container">
      <div className="oder-item-header">
        <img src={value.img} alt="" />
        {isEdit === true ? (
          <span className="order-item-btn">
            <Icon
              icon="plus-square"
              style={{ color: "green" }}
              onClick={() => clickHandler("Add", value)}
            />
            <span>{value.qtn}</span>
            <Icon
              icon="minus-square"
              onClick={() => clickHandler("remove", value)}
            />
          </span>
        ) : (
          <div className="oder-item-text">
            <span>
              {" "}
              {value.name} x {value.qtn}{" "}
            </span>
            <span className="oder-item-price">{value.price * value.qtn}</span>
          </div>
        )}
        {isEdit && <span className="oder-item-name">{value.name}</span>}
      </div>
      {isEdit && (
        <div className="oder-item-bottom">
          <input type="text" placeholder="notes" />
          <span className="oder-item-price">{value.price * value.qtn}</span>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (sate) => {
  return {
    preOder: sate.preOder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePreOder: (data) => {
      dispatch(removePreOderAction(data));
    },
    updatePreOder: (data) => {
      dispatch(updatePreOderAction(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
