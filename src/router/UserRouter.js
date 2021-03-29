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
import UserHashTag from "../components/UserHashTag";
import MSetting from "../components/MSetting";
import Checking from "../components/Checking";
import { Notification } from "rsuite";
import VoucherPage from "../components/VoucherPage";

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
