import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Restaurant/Home";
import Menu from "../components/Restaurant/Menu";
import Order from "../components/Restaurant/Order";
import Widget from "../components/Restaurant/Widget";
import RestaurantLogin from "../components/Restaurant/RestaurantLogin";
import RestaurantLayout from "../layout/RestaurantLayout";
import { connect } from "react-redux";
import { restaurantInfoReducer } from "../store/reducer/restaurantInfoReducer";
import  { Redirect } from 'react-router-dom'
import {checkToken} from '../middlerware/restaurantMiddleware'


const RestaurantRouter = ({isLogin, checkToken}) => {
  if(!localStorage.getItem("auth_token")) {
    return <Redirect to='/rLogin'  />
  }   

  const data = async () => {
    try {
      await checkToken()
    } catch (error) {
      window.location.href = "/rLogin"
    }
  }
  data()

  return (
    <Switch>
      {/* <Route path="/restaurant/login">
        <RestaurantLogin />
      </Route> */}
      <Route path="/restaurant" exact>
        <RestaurantLayout>
          <Widget />
        </RestaurantLayout>
      </Route>
      <Route path="/restaurant/menu" exact>
        <RestaurantLayout>
          <Menu />
        </RestaurantLayout>
      </Route>
      <Route path="/restaurant/setting" exact>
        <RestaurantLayout>
          <Home />
        </RestaurantLayout>
      </Route>
      <Route path="/restaurant/oder" exact>
        <RestaurantLayout>
          <Order tabTitle="List oder" renderList={0} />
        </RestaurantLayout>
      </Route>
      <Route path="/restaurant/processing" exact>
        <RestaurantLayout>
          <Order tabTitle="Processing" renderList={1} />
        </RestaurantLayout>
      </Route>
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.restaurantInfo.isLogin
  }
} 

export default connect(mapStateToProps, {checkToken})(RestaurantRouter);
