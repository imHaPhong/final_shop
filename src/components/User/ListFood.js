import React, { useEffect, useState } from "react";
import FoodItem from "../Share/FoodItem";
import { getAllRestaurant } from "../../middlerware/userMiddlerware";
import { connect } from "react-redux";

const ListFood = ({ title, getAllRestaurant, listRestaurant }) => {
  const [listMenu, setListMenu] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllRestaurant();
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div>
      <h3>{title}</h3>
      <div className="food-list">
        {listRestaurant.length >= 0 &&
          listRestaurant.map((el, index) => {
            return <FoodItem key={index} restaurantData={el} />;
          })}
      </div>
    </div>
  );
};

const mapStataToProp = (state) => {
  return {
    listRestaurant: state.listRestaurant,
  };
};

export default connect(mapStataToProp, { getAllRestaurant })(ListFood);
