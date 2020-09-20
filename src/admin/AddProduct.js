import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {createProduct} from "./apiAdmin";


const AddProduct = () => {
    // Destructure user and token from localstorage
    const {user, token} = isAuthenticated()

    const[values, setValues] = useState({
        name:'',
        description: '',
        price: '',
        categories:[],
        category: '',
        quantity: '',
        shipping: '',
        photo: '',
        loading: false,
        error: '',
        createdProductName: '',
        redirectToProfile: false,
        formData: ''
    })

    const {
        name,
        description,
        price,
        categories,
        category,
        quantity,
        shipping,
        photo,
        loading,
        error,
        createdProductName,
        redirectToProfile,
        formData
    } = values

    useEffect(() => {
        setValues({...values, formData: new FormData()})
    }, [])

    const handleChange = name => event => {
        const value =
            name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name,value)
        setValues({...values, [name]: value})
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: '', loading: true})
        createProduct(user._id, token, formData)
            .then(response => {
                if(response.error) {
                    setValues({...values, error: response.error})
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        price: '',
                        photo: '',
                        quantity: '',
                        loading: false,
                        createdProductName: response.name
                    })
                }
            })

    }
    //
    // const showSuccess = () => {
    //     if(success) {
    //         return <h6 className='text-success'>Category {categoryName} Created</h6>
    //     }
    // }
    // const showError = () => {
    //     if(!success) {
    //         return <h6 className='text-danger'>Category name should be unique</h6>
    //     }
    // }

    const newProductForm = () => {
        return (
            <div className='container'>
                <form onSubmit={clickSubmit} className="mb-3">
                    <h4>Add photo</h4>
                    <div className="form-group">
                        <label className='btn btn-secondary' >
                            <input onChange={handleChange('photo')} type="file" name='photo' accept='image/*' />
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="text-muted" >Name</label>
                        <input type="text" className='form-control' onChange={handleChange('name')} value={name} required  />
                    </div>
                    <div className="form-group">
                        <label className="text-muted" >Description</label>
                        <textarea onChange={handleChange('description')} type="text" className='form-control' value={description} required  />
                    </div>
                    <div className="form-group">
                        <label className="text-muted" >Price</label>
                        <input type="text" className='form-control' onChange={handleChange('price')} value={price} required  />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Product category</label>
                        <select onChange={handleChange('category')} className="form-control">
                            <option value="5f65cf6984b52306d02a62a7">JS</option>
                            <option value="5f65cf6984b52306d02a62a7">PHP</option>
                        </select>

                    </div>
                    <div className="form-group">
                        <label className="text-muted">Shipping</label>
                        <select onChange={handleChange('shipping')} className="form-control">
                            <option value="0">NO</option>
                            <option value="1">YES</option>
                        </select>

                    </div>
                    <div className="form-group">
                        <label className="text-muted" >Quantity</label>
                        <input type="text" className='form-control' onChange={handleChange('quantity')} value={quantity} required  />
                    </div>
                    <button className="btn btn-primary">Create product</button>
                </form>
            </div>
        )
    }


    return (
        <Layout title='Add a new product' description={`${user.name} dashboard.`} className='container'>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {/*{showError()}*/}
                    {/*{showSuccess()}*/}
                    {newProductForm()}
                </div>
            </div>


        </Layout>
    )
}

export default AddProduct


