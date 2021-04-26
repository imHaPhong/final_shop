import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "rsuite";
import { useMediaQuery } from "../../utilities/custom-hooks/useMediaQuery";
import Header from "../../components/User/Header";
import ListFood from "../../components/User/ListFood";
import { connect } from "react-redux";
import {getLocation} from "../../middlerware/userMiddlerware"

const Order = ({getLocation}) => {
  const [height, setHeight] = useState(null);
  const ref = useRef();

  const [userLocation, setUserLocation] = useState();

  useEffect(() => {
    // const height = document.querySelector(".nav-container").clientHeight;
    setHeight(height);
    navigator.geolocation.getCurrentPosition(function (position) {
      getLocation([position.coords.latitude,position.coords.longitude])

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
        <span className="oder-header">Most poplar</span>
        <ListFood />
      </div>
      <div className="container order-container">
        <span className="oder-header">All</span>
        <ListFood />
      </div>
    </div>
  );
};

export default connect(null, {getLocation})(Order);
