import React from "react";
import { Route, Switch } from "react-router";
import CreateAccountForm from "./components/CreateAccountForm";
import LoginPage from "./components/Login";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
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
      <Route path="/restaurant">
        <RestaurantRouter />
      </Route>
      <Route path="/register" exact>
        <CreateAccountForm />
      </Route>
    </Switch>
  );
};

export default Routers;
