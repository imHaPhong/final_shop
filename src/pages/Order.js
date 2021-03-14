import React, { useEffect, useRef, useState } from "react";
import FoodDetail from "../components/FoodDetail";
import Header from "../components/Header";
import ListFood from "../components/ListFood";

const Order = () => {
  const [height, setHeight] = useState(null);
  const ref = useRef();

  const [userLocation, setUserLocation] = useState();

  useEffect(() => {
    // const height = document.querySelector(".nav-container").clientHeight;
    setHeight(height);
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);
  return (
    <div>
      <Header />
      <div className="container order-container">
        <ListFood />
      </div>
    </div>
  );
};

export default Order;
