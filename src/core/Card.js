import React from "react";
import {Link} from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({product}) => {
    return (
        <div className='col-4 mb-3'>
            <div className="card">
                <div className="card-header">{product.name}</div>
                <div className="card-body">
                    <ShowImage product={product} url='product'/>
                    <p>{product.description.substring(0, 100)}</p>
                    <p>${product.price}</p>
                    <Link to='/'>
                        <button className='btn btn-primary mt-2 mb-2'>
                            View Product
                        </button>
                    </Link>
                    <Link to='/'>
                        <button className='btn btn-warning mt-2 mb-2'>
                            Add to cart
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card