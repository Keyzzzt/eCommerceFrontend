import React from "react";
import {API} from "../config";

const ShowImage = ({product, url}) => {
    return (
        <div className='product-img'>
            <img src={`${API}/${url}/photo/${product._id}`} alt={product.name} style={{maxWidth: '100%' }} className="mb-3"/>
        </div>
    )
}

export default ShowImage