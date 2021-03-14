import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router";
import Me from "../components/Me";
import Home from "../pages/Home";
import { getUserInfo, setUserInfo } from "../middlerware/userMiddlerware";
import CModal from "../components/CModal";
import Order from "../pages/Order";
import FoodDetail from "../components/FoodDetail";
import CreateAccountForm from "../components/CreateAccountForm";
import UserOder from "../components/UserOder";

const UserRouter = ({ getUserInfo, auth, setUserInfo }) => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    getUserInfo();
    const getUSerInfo = localStorage.getItem("UserInfo");
    if (!getUSerInfo) {
      return getUserInfo();
    }
    setUserInfo(JSON.parse(getUSerInfo));
  }, []);
  useEffect(() => {
    if (auth.err) {
      setIsShow(true);
    }
  }, [auth.err]);
  // if (!auth.auth) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <>
      {auth.err.error && isShow && (
        <CModal
          className="mModal"
          title={"Login Error"}
          msgErr={auth.err.error}
          isShow={isShow}
          setIsShow={setIsShow}
        />
      )}

      <Switch>
        <Route path="/user/oder/:id" exact>
          <FoodDetail />
        </Route>
        <Route path="/user/listRestaurant" exact>
          <Order />
        </Route>
        <Route path="/user/register" exact>
          <CreateAccountForm />
        </Route>
        <Route path="/user/oder" exact>
          <UserOder />
        </Route>
        <Route path="/user" exact>
          <Home />
        </Route>
        <Route path="/user/mypost">
          <Me />
        </Route>
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getUserInfo, setUserInfo })(
  UserRouter
);
