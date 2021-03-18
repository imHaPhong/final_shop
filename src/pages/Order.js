import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "rsuite";
import FoodDetail from "../components/FoodDetail";
import Header from "../components/Header";
import ListFood from "../components/ListFood";
import { useMediaQuery } from "../utilities/custom-hooks/useMediaQuery";

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
  const isMoblie = useMediaQuery("(max-width: 992px)");

  return (
    <div>
      <Header />
      {!isMoblie && (
        <Carousel
          autoplay
          className="custom-slider"
          shape="bar"
          autoplayInterval="5000"
        >
          <div className="slide-cotainer">
            <img src="https://media.foody.vn/images/beauty-upload-api-675x355-210219174402.jpg" />
            <img
              src="https://images.foody.vn/biz_banner/foody-upload-api-food-biz-210316152045.jpg"
              alt=""
            />
            <img src="https://images.foody.vn/biz_banner/foody-675x355_foodyappbanner-636530746968443602.jpg" />
          </div>
          <div className="slide-cotainer">
            <img src="https://media.foody.vn/images/beauty-upload-api-675x355-210219174402.jpg" />
            <img
              src="https://images.foody.vn/biz_banner/foody-upload-api-food-biz-210316152045.jpg"
              alt=""
            />
            <img src="https://images.foody.vn/biz_banner/foody-675x355_foodyappbanner-636530746968443602.jpg" />
          </div>
        </Carousel>
      )}
      {isMoblie && (
        <Carousel autoplay className="custom-slider" shape="bar">
          <img src="https://media.foody.vn/images/beauty-upload-api-675x355-210219174402.jpg" />
          <img
            src="https://images.foody.vn/biz_banner/foody-upload-api-food-biz-210316152045.jpg"
            alt=""
          />
          <img src="https://images.foody.vn/biz_banner/foody-675x355_foodyappbanner-636530746968443602.jpg" />
          <img src="https://media.foody.vn/images/beauty-upload-api-675x355-210219174402.jpg" />
          <img
            src="https://images.foody.vn/biz_banner/foody-upload-api-food-biz-210316152045.jpg"
            alt=""
          />
          <img src="https://images.foody.vn/biz_banner/foody-675x355_foodyappbanner-636530746968443602.jpg" />
        </Carousel>
      )}
      <div className="container order-container">
        <span className="oder-header">Near you</span>
        <ListFood />
      </div>
      <div className="container order-container">
        <span className="oder-header">Near you</span>
        <ListFood />
      </div>
    </div>
  );
};

export default Order;
