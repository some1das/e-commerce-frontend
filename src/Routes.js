import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Home from "./core/helper/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminDashBoard from "./user/AdminDashBoard";
import UserDashBoard from "./user/UserDashBoard";
import PrivateRoute from "./auth/helper/PrivateRoute";
import AdminRoute from "./auth/helper/AdminRoute";
import CreateCategory from "./admin/CreateCategory";
import ManageCategory from "./admin/ManageCategory";
import CreateProduct from "./admin/CreateProduct";
import ManageProduct from "./admin/ManageProduct";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/cart/Cart";
import PlaceOrder from "./core/PlaceOrder";
import ManageOrders from "./admin/ManageOrders";
import UserVerification from "./user/UserVerification";
import MyOrders from "./orders/MyOrders";
import MyShoppingHistory from "./orders/MyShoppingHistory";
import EditOrder from "./admin/helper/EditOrder";

function routes() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/order/place" component={PlaceOrder} />
          <Route exact path="/otp/verification" component={UserVerification} />
          <Route exact path="/orders/current" component={MyOrders} />
          <Route exact path="/orders/history" component={MyShoppingHistory} />
          <PrivateRoute
            exact
            path="/user/dashboard"
            component={UserDashBoard}
          />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashBoard}
          />
          <AdminRoute
            exact
            path="/admin/create/category"
            component={CreateCategory}
          />
          <AdminRoute
            exact
            path="/admin/categories"
            component={ManageCategory}
          />
          <AdminRoute
            exact
            path="/admin/create/product"
            component={CreateProduct}
          />
          <AdminRoute
            exact
            path="/admin/product"
            component={ManageProduct}
          />
          <AdminRoute
            exact
            path="/admin/product/update/:productId"
            component={UpdateProduct}
          />
          <AdminRoute
            exact
            path="/admin/orders"
            component={ManageOrders}
          />
          <AdminRoute
            exact
            path="/admin/order/edit/:orderId"
            component={EditOrder}
          />

        </Switch>
      </Router>
    </div>
  );
}

export default routes;
