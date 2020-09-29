import React, {useEffect, useState} from "react";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {createOrder, getBraintreeClientToken, processPayment} from "./apiCore";
import 'braintree-web'
import DropIn from "braintree-web-drop-in-react";
import {emptyCartAfterPurchase} from "./cartHelpers";


const Checkout = ({products}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        err: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token)
            .then(response => {
                if(response.error) {
                    setData({...data, error: response.error})
                } else {
                    setData({...data, clientToken: response.clientToken})
                }
            })
    }
    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckOut = () => {
        return isAuthenticated() ? (
                        <div>{showDropIn()}</div>
                ) : (
                    <Link to='/signin'>
                        <button className='btn btn-success'>SignIn</button>
                    </Link>

                )}
    const showSuccessPayment = (success) => {
        return (
            <div className='alert alert-info' style={{display: success ? '' : 'none'}}>
                Transaction successful.
            </div>
        )

        }
    const showErrorPayment = (success) => {
        return (
            <div className='alert alert-danger' style={{display: success ? 'none' : ''}}>
                Transaction failed.
            </div>
        )

    }


    const pay = () => {
        setData({...data, loading: true})
        // Send the nonce to your server
        // nonce = data.instance.requestPaymentMethod
        let nonce
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(response => {
                // console.log(response)
                nonce = response.nonce
                // Once we have nonce(card type, card number etc), send nonce as paymentMethodNonce, and total to be charged
                // console.log('nonce to process:', nonce, getTotal(products))
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }
                processPayment(userId, token, paymentData)
                    .then(response => {
                        // Send order data to API
                        const orderData = {
                            products: products,
                            transaction_id: response.transaction_id,
                            amount: response.transaction.amount,
                            address: data.address
                        }
                        createOrder(userId, token, orderData)

                        // Set data with response
                        setData({...data, success: true})

                        // Empty cart
                        emptyCartAfterPurchase(() => {
                            setData({...data, loading: false})
                            console.log('payment success and empty cart')
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                // console.log('dropping error: ', err)
                setData({...data, error: err.message})
            })
    }

    const handleAddress = (event) => {
        setData({...data, address: event.target.value})
    }

    const showDropIn = () => {
        return (
            <div>
                {data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <div className="from-group mb-3">
                            <label className="text-muted">Delivery address:</label>
                            <textarea onChange={handleAddress} className="form-control" value={data.address} placeholder='Type your delivery address here ...' />
                        </div>
                        <DropIn options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }} onInstance={instance => data.instance = instance} />
                        <button onClick={pay} className="btn btn-success btn-block">Pay</button>
                    </div>
                ) : null }
            </div>
        )
    }


    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showSuccessPayment(data.success)}
            {showErrorPayment(data.success)}
            {showCheckOut()}
        </div>
    )
}

export default Checkout