import React, {useEffect, useState} from "react";
import Layout from './Layout'
import {getRelatedProducts, productRequest} from "./apiCore";
import Card from "./Card";
import Search from "./Search";


const Product = (props) => {
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
    const [relatedProducts, setRelatedProducts] = useState([])


    const loadSingleProduct = (productId) => {
        productRequest(productId).then(response => {
                if(response.error) {
                    setError(response.error)
                } else {
                    setProduct(response)
                    // After we have received product, we can fetch related products
                    getRelatedProducts(response._id)
                        .then(response => {
                            if(response.error) {
                                setError(response.error)
                            } else {
                                setRelatedProducts(response)
                            }
                        })
                }
            })
    }



    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props])


    return(
        <Layout title={product && product.name} description={product && product.description} className='container-fluid'>

            <div className="row">
                <div className="col-8">
                    <h4>Single</h4>
                    {product &&
                    product.description &&
                    <Card product={product} viewProductButton={false} />}
                </div>
                <div className="col-4">
                    <h4>Related</h4>
                    {relatedProducts.map((product, index) => (
                        <div className='mb-3'>
                            <Card key={index} product={product}/>
                        </div>
                    )) }

                </div>
            </div>
        </Layout>
    )
}

export default Product