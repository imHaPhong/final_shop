import React from "react";
import { Route, Switch } from "react-router";
import RestaurantLogin from "./components/Restaurant/RestaurantLogin";
import CreateAccountForm from "./components/User/CreateAccountForm";
import LoginWithFb from "./components/User/LoginWithFb";
import Home from "./pages/user/Home";
import RegisterPage from "./pages/user/RegisterPage";
import Search from "./pages/user/Search";
import AdminRouter from "./router/AdminRouter";
import PublicRouter from "./router/PublicRouter";
import RestaurantRouter from "./router/RestaurantRouter";
import UserRouter from "./router/UserRouter";

const Routers = () => {
  return (
    <Switch>
      <PublicRouter path="/login">
        <Home />
      </PublicRouter>
      <Route path="/user">
        <UserRouter />
      </Route>
      {/* <Route path="/search/food/">
        <Search />
      </Route> */}
      <Route path="/search/:id" exact>
        <Search />
      </Route>
      <Route path="/restaurant" >
        <RestaurantRouter />
      </Route>
      <Route path="/admin" >
        <AdminRouter />
      </Route>
      <Route path="/rLogin" exact>
        <RestaurantLogin />
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Route path="/loginWithGg" exact>
        <LoginWithFb />
      </Route>
      
    </Switch>
  );
};

export default Routers;
