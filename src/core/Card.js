import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import ShowImage from "./ShowImage";
import {addProductToCart, updateItem, remove, removeItem} from "./cartHelpers";

const Card = ({   product,
                  addToCartButton = true,
                  viewProductButton = true,
                  incrementDecrementQuantity = false,
                  setRun = f => f,
                  run = undefined,
                  showRemoveProductButton = false,

}) => {
    const [redirect, setRedirect] = useState(false)
    const [quantityCount, setQuantityCount] = useState(product.count)

    const addToCart = ()  => {
        addProductToCart(product, () => {
            setRedirect(true)
        })
    }
    const shouldRedirect = (redirect) => {
        if(redirect) {
            return <Redirect to='/cart' />
        }
    }


    const handleChange = (productId) => (event) => {
        setRun(!run)
        setQuantityCount(event.target.value < 1 ? 1 : event.target.value )
        if(event.target.value >= 1) {
            updateItem(productId, event.target.value)
        }
    }
    const showIncrementDecrementOption = (incrementDecrementQuantity) => {
        return incrementDecrementQuantity && <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust quantity</span>
                </div>
                <input onChange={handleChange(product._id)} type="number" className='form-control' value={quantityCount}/>
            </div>
        </div>
    }
    const showRemoveButton = (showRemoveProductButton) => {
        return showRemoveProductButton && (
            <div>
                <button onClick={() => {
                    removeItem(product._id)
                    setRun(!run)
                }} className='btn btn-danger'>Remove</button>
            </div>
        )
    }


    return (
            <div className="card">
                <div className="card-header">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage product={product} url='product'/>
                    <p>{product.description.substring(0, 100)}</p>
                    <p>${product.price}</p>
                    {viewProductButton && (
                        <Link to={`/product/${product._id}`}>
                            <button className='btn btn-primary mt-2 mb-2 mr-2'>
                                View Product
                            </button>
                        </Link>
                    )}
                    {addToCartButton && (
                        <Link to='/'>
                            <button onClick={addToCart} className='btn btn-warning mt-2 mb-2'>
                                Add to cart
                            </button>
                        </Link>
                    )}
                    {showIncrementDecrementOption(incrementDecrementQuantity)}
                    {showRemoveButton(product._id)}
                </div>
            </div>
    )
}

export default Card