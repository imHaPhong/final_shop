import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Restaurant/Home";
import Menu from "../components/Restaurant/Menu";
import Order from "../components/Restaurant/Order";
import AdminWidget from "../components/Admin/AdminWidget";
import RestaurantLogin from "../components/Restaurant/RestaurantLogin";
import RestaurantLayout from "../layout/RestaurantLayout";
import AdminLayout from "../layout/AdminLayout";
import { connect } from "react-redux";
import { restaurantInfoReducer } from "../store/reducer/restaurantInfoReducer";
import  { Redirect } from 'react-router-dom'
import {checkToken} from '../middlerware/restaurantMiddleware'
import RestaurantRp from "../pages/admin/RestaurantRp";


const AdminRouter = () => {
    console.log("ccc");
  return (
    <Switch>
      <Route path="/admin" exact>
        <AdminLayout>
          <AdminWidget />
        </AdminLayout>
      </Route>
      <Route path="/admin/restaurant" exact>
        <AdminLayout>
        <RestaurantRp />

        </AdminLayout>
      </Route>
      <Route path="/admin/setting" exact>
        <AdminLayout>
          <Home />
        </AdminLayout>
      </Route>
      <Route path="/admin/oder" exact>
        <AdminLayout>
          <Order tabTitle="List oder" renderList={0} />
        </AdminLayout>
      </Route>
      <Route path="/admin/processing" exact>
        <AdminLayout>
          <Order tabTitle="Processing" renderList={1} />
        </AdminLayout>
      </Route>
    </Switch>
  );
};



export default AdminRouter
