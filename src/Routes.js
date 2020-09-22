import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom' //This will wrap other components, so that we will be able to grap parameters from query string
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import UserDashboard from './user/UserDashboard'
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/shop' exact component={Shop} />
                <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                <AdminRoute path='/category/create' exact component={AddCategory} />
                <AdminRoute path='/product/create' exact component={AddProduct} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes



