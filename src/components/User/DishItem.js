import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Icon } from "rsuite";

import {
  updatePreOder,
  addPreOder,
  createrOder,
} from "../../middlerware/userMiddlerware";

const DishItem = ({ addPreOder, updatePreOder, data, createrOder }) => {
  const { id } = useParams();

  const saveValue = (dishData) => {
    var dish = [];
    dish = JSON.parse(localStorage.getItem("dish") || "[]");
    let dList;
    const check = dish.map((el) => {
      if (el.id === dishData.id) {
        return true;
      }
      return false;
    });

    if (check.includes(true)) {
      updatePreOder(dishData);
      dList = dish.map((el) => {
        if (el.id === dishData.id) {
          el.qtn += 1;
        }
        return el;
      });
    } else {
      dish.push(dishData);
      addPreOder(dishData);
    }
    if (dList) {
      dish = dList;
    }

    localStorage.setItem("dish", JSON.stringify(dish));
  };

  return (
    <div className="dish-item">
      <div className="dish-item-img">
        <img src={data.img} alt="" />
      </div>
      <div className="dish-item-content">
        <span className="dish-item-title">{data.name}</span>

        <span>Đóng gói túi 10c kèm nước chấm</span>
        <div className="dish-item-footer">
          <div className="di-footer-oder">
            Oder <span> 100+</span>{" "}
          </div>
          <div>
            <Icon icon="thumbs-up" className="mr-1" />
            10+
          </div>
        </div>
      </div>
      <div className="dish-item-price">
        <span>
          <NumberFormat
            value={data.price}
            displayType={"text"}
            thousandSeparator={true}
          />
          <span className="current">đ</span>
        </span>
        <Icon
          icon="plus-square"
          onClick={() =>
            saveValue({
              img: data.img,
              rid: id,
              id: data._id,
              price: data.price,
              name: data.name,
              qtn: 1,
            })
          }
        />
      </div>
    </div>
  );
};

const mapStateToProps = (sate) => {
  return {
    preOder: sate.preOder,
  };
};

export default connect(mapStateToProps, {
  addPreOder,
  updatePreOder,
  createrOder,
})(DishItem);
