import React from "react";
import { Redirect, useHistory } from "react-router";
import { Icon } from "rsuite";

const FoodItem = ({ restaurantData }) => {
  console.log(restaurantData);
  let history = useHistory();
  const clickHandler = () => {
    history.push(`/user/oder/${restaurantData._id}`);
  };
  return (
    <div className="food-item" onClick={clickHandler}>
      <img
        // src="https://images.foody.vn/res/g76/758862/prof/s280x175/foody-upload-api-foody-mobile-thuy-beo-jpg-180713113040.jpg"
        src={restaurantData.avatar}
        alt="anh thua n"
      />
      <span className="food-name">{restaurantData.restaurantName}</span>
      <span className="food-address">{restaurantData.address}</span>
      <span className="food-discount">
        <Icon icon="tag" />
        <span> Item discount</span>
      </span>
    </div>
  );
};

export default FoodItem;
