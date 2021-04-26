import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router";
import Me from "../components/User/Me";
import { getUserInfo, setUserInfo } from "../middlerware/userMiddlerware";
import CModal from "../components/User/CModal";
import FoodDetail from "../components/User/FoodDetail";
import CreateAccountForm from "../components/User/CreateAccountForm";
import UserOder from "../components/User/UserOder";
import UserHashTag from "../components/User/UserHashTag";
import MSetting from "../components/User/MSetting";
import Checking from "../components/User/Checking";
import { Notification } from "rsuite";
import VoucherPage from "../components/User/VoucherPage";
import Home from "../pages/user/Home";
import Order from "../pages/user/Order";
import GetNearRestaurant from "../components/User/GetNearRestaurant";

const UserRouter = ({ getUserInfo, auth, setUserInfo }) => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const getUSerInfox = await localStorage.getItem("UserInfo" || []);
      if (!getUSerInfox) {
        return getUserInfo();
      }
      await setUserInfo(JSON.parse(getUSerInfox));
      if (!auth.auth) {
        return <Redirect to="/login" />;
      }
    };
    getData();
  }, []);
  useEffect(() => {
    if (auth.err) {
      setIsShow(true);
    }
  }, [auth.err]);

  useEffect(() => {}, []);

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
        <Route path="/user/oder" exact>
          <UserOder />
        </Route>
        <Route path="/user/tag/:rName" exact>
          <UserHashTag />
        </Route>
        <Route path="/user" exact>
          <Home />
        </Route>
        <Route path="/user/page" exact>
          <VoucherPage />
        </Route>
        <Route path="/user/nearme" exact>
          <GetNearRestaurant />
        </Route>
        <Route path="/user/setting" exact>
          <MSetting />
        </Route>
        <Route path="/user/checking/:id">
          <Checking />
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
