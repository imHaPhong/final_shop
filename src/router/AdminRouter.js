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
import AdminPost from "../components/Admin/AdminPost";
import Report from '../pages/admin/Report';
import AddVoucher from "../pages/admin/AddVoucher";


const AdminRouter = () => {
    console.log("ccc");
  return (
    <Switch>
      <Route path="/admin" exact>
        <AdminLayout>
          <AdminWidget />
        </AdminLayout>
      </Route>
      <Route path="/admin/report" exact>
        <AdminLayout>
        <Report />

        </AdminLayout>
      </Route>
      <Route path="/admin/create" exact>
        <AdminLayout>
          <AddVoucher />
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
