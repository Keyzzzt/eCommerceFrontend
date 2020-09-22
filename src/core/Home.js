import React, {useEffect, useState} from "react";
import Layout from './Layout'
import {getProducts} from "./apiCore";
import Card from "./Card";
import Search from "./Search";


const Home = () => {
    const [productsBySell, setProductsBySell] =useState([])
    const [productsByArrival, setProductsByArrival] =useState([])
    const [error, setError] =useState(false)

    const loadProductsBySell = () => {
        getProducts('sold').then(products => {
            if(products.error) {
                setError(products.error)
            } else {
                setProductsBySell(products)
            }
        })
    }
    const loadProductsByArrival = () => {
        getProducts('createdAt').then(products => {
            if(products.error) {
                setError(products.error)
            } else {
                setProductsByArrival(products)
            }
        })
    }

    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()
    }, [])

    return(
        <Layout title='Home Page' description='Node React application' className='container-fluid'>
            <Search />
            <h2 className="mb-4">Best sellers</h2>
            <div className="row">
                {productsBySell.map((product, index) => (<Card key={index} product={product} />) )}
            </div>
            <hr/>
            <h2 className="mb-4">Newest</h2>
            <div className="row">
                {productsByArrival.map((product, index) => (<Card key={index} product={product} />) )}

            </div>
        </Layout>
    )
}

export default Home