import React from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "../components/Restaurant/Menu";
import Order from "../components/Restaurant/Order";
import RestaurantLogin from "../components/RestaurantLogin";
import RestaurantLayout from "../layout/RestaurantLayout";

const RestaurantRouter = () => {
  return (
    <Switch>
      <Route path="/restaurant/login">
        <RestaurantLogin />
      </Route>
      <Route path="/restaurant" exact>
        <RestaurantLayout>
          <Menu />
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

export default RestaurantRouter;
