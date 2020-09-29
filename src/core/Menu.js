import React from "react";
import {Link, withRouter} from 'react-router-dom'
import {isAuthenticated, signout} from "../auth/index";
import {totalProductsInCart} from "./cartHelpers";

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: '#ff9900'}
    } else {
        return {color: '#fff'}
    }
}

const Menu = ({history}) => {

    return(
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className='nav-link' to='/' style={isActive(history, '/')}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link' to='/shop' style={isActive(history, '/shop')}>Shop</Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link' to='/cart' style={isActive(history, '/cart')}>Cart <sup><small className='cart-badge'>{totalProductsInCart()}</small></sup></Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link className='nav-link' to='/user/dashboard' style={isActive(history, '/user/dashboard')}>Dashboard</Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link className='nav-link' to='/admin/dashboard' style={isActive(history, '/user/dashboard')}>Dashboard</Link>
                    </li>
                )}
                {!isAuthenticated() && (
                    <>
                        <li className="nav-item">
                            <Link className='nav-link' to='/signin' style={isActive(history, '/signin')}>Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/signup' style={isActive(history, '/signup')}>Signup</Link>
                        </li>
                    </>
                )}
                {isAuthenticated() && (
                    <>
                        <li className="nav-item">
                    <span className='nav-link' onClick={() => signout(() => {
                        history.push('/')
                    })} style={{color: '#fff', cursor: 'pointer'}}>Signout</span>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default withRouter(Menu)