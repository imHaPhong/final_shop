import React, { useEffect, useState } from "react";
import FoodItem from "../Share/FoodItem";
import { getAllRestaurant, getPopulateRestaurant, getNearRestaurant } from "../../middlerware/userMiddlerware";
import { connect } from "react-redux";

const ListFood = ({ title, filter = "all", getAllRestaurant, listRestaurant, getPopulateRestaurant, getNearRestaurant }) => {
  const [listMenu, setListMenu] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getAllRestaurant();
  //     console.log(data);
  //   };
  //   getData();
  // }, []);
  useEffect(() => {
    
    const getData = async () => {
      var data
      switch (filter) {
        case "near":
          navigator.geolocation.getCurrentPosition(async function (position) {
            data = await getNearRestaurant( {lnt: position.coords.latitude, long: position.coords.longitude});
            setListMenu(data);

          });
          break
        case "top":
          data = await getPopulateRestaurant();
          setListMenu(data);
          break
        default:
          data = await getAllRestaurant();
          setListMenu(data);

      }
    };
    getData();
  }, []);
  return (
    <div>
      <h3>{title}</h3>
      <div className="food-list">
        {listMenu.length >= 0 &&
          listMenu.map((el, index) => {
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

export default connect(mapStataToProp, { getAllRestaurant, getPopulateRestaurant, getNearRestaurant })(ListFood);
