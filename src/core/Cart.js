import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import {getProductsThatAreInCart, totalProductsInCart} from "./cartHelpers";
import Card from "./Card";
import {Link} from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
    const [products, setProducts] = useState([])
    const [run, setRun] = useState(false);

    useEffect(() => {
        setProducts(getProductsThatAreInCart())
    },[run])

    const showProducts = () => {
        return (
            <div>
                <h4>Your cart has {products.length} products</h4>
                <hr/>
                <div>
                    {products.map((product, i) => (
                        <div className='mb-3'>
                            <Card
                                key={i}
                                product={product}
                                addToCartButton={false}
                                incrementDecrementQuantity={true}
                                showRemoveProductButton={true}
                                setRun={setRun}
                                run={run}
                            />
                        </div>
                    ))}
                </div>

            </div>
        )
    }

    const ifNoProductsToShow = () => {
        return <div>
            <h4>No items to display><Link to='/shop'>Continue shopping</Link></h4>
        </div>
    }

    return (
        <Layout title='Cart Page' description={'Cart + Checkout'} className='container-fluid'>
                <div className="row">
                    <div className="col-6">
                        {products.length < 1 ? (
                            ifNoProductsToShow()
                        ) : (
                            showProducts(products)
                        )}
                    </div>
                    <div className="col-6">
                        <h2>Cart summary</h2>
                        <Checkout products={products}/>
                    </div>
                </div>
        </Layout>
    )
}







export default Cart