import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom' //This will wrap other components, so that we will be able to grap parameters from query string
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes