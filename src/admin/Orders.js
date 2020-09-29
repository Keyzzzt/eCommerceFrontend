import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {getOrderStatusValues, ordersList, updateOrderStatus} from './apiAdmin';
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [statusValues, setStatusValues] = useState([])
    const {user, token} = isAuthenticated()

    const loadOrders = () => {
        ordersList(user._id, token)
            .then(response => {
                if(response.error) {
                    console.log(response.error)
                } else {
                    console.log(response)
                    setOrders(response)
                }
            })
    }
    const loadOrderStatusValues = () => {
        getOrderStatusValues(user._id, token)
            .then(response => {
                if(response.error) {
                    console.log(response.error)
                } else {
                    console.log(response)
                    setStatusValues(response)
                }
            })
    }
    const inCaseNoOrders = (orders) => {
        return orders.length < 1 ? (
            <h4>No Orders</h4>
        ) : null
    }

    useEffect(() => {
        loadOrders()
        loadOrderStatusValues()
    }, [])

    const showInput = (key, value) => {
        return (
            <div className='input-group mb-2 mr-sm-2'>
                <div className="input-group-prepend">
                    <div className="input-group-text">{key}</div>
                </div>
                <input type="text" value={value} className='form-control' readOnly/>
            </div>
        )
    }

    const handleStatusChange = (event, orderId) => {
        updateOrderStatus(orderId, user._id, token, event.target.value)
            .then(response => {
                if(response.error) {
                    console.log('Status update failed')
                } else {
                    loadOrders()
                }
            })
    }

    const showStatus = (order) => {
        return (
            <div className='form-group'>
                <h3 className="mark mb-4">Status: {order.status}</h3>
                <select onChange={(event) => handleStatusChange(event, order._id)} className="form-control">
                    <option>Update Status</option>
                    {statusValues.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                </select>
            </div>
        )
    }

    return (
        <Layout title='Orders' description={`You have total ${orders.length} orders`} className='container'>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {inCaseNoOrders(orders)}
                    {orders.map((item, itemIndex) => {
                        return (
                            <div className='mt-5' key={itemIndex} style={{border: '2px solid indigo', padding: '10px'}}>
                                <h4 className='mb-5'>
                                    <span className="bg-primary">Order ID: {item._id}</span>
                                </h4>
                                <ul className="list-group mb-r">
                                    <li className="list-group-item">Order status: {showStatus(item)}</li>
                                    <li className="list-group-item">Transaction ID: {item.transaction_id}</li>
                                    <li className="list-group-item">Amount: ${item.amount}</li>
                                    <li className="list-group-item">Ordered By: {item.user.name}</li>
                                    <li className="list-group-item">Ordered On: {moment(item.createdAt).fromNow()}</li>
                                    <li className="list-group-item">Delivery address: {item.address}</li>
                                </ul>
                                <h3 className='mt-4 mb-4 font-italic'>
                                    Total products in the order: {item.products.length}
                                </h3>
                                {item.products.map((product, productIndex) => {
                                    return (
                                        <div className='mb-4' key={productIndex} style={{padding: '20px', border: '2px solid indigo'}}>
                                            {showInput('Product name', product.name)}
                                            {showInput('Product price', product.price)}
                                            {showInput('Product total', product.count)}
                                            {showInput('Product ID', product._id)}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>


        </Layout>
    )
}

export default Orders