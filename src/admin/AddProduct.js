import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {createProduct, getCategories} from "./apiAdmin";


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
        createdProduct: '',
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
        createdProduct,
        redirectToProfile,
        formData
    } = values

    // Load categories and set form data
    const init = () => {
        getCategories().then(categories => {
            if(categories.error) {
                setValues({...values, error: categories.error})
            } else {
                setValues({...values, categories: categories, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
        init()
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
                        createdProduct: response.name
                    })
                }
            })

    }


    const showSuccess = () => {
        return (
            <div className='alert alert-info' style={{display: createdProduct ? '' : 'none'}}>
                <h2>{`${createdProduct} is created`}</h2>
            </div>

        )
    }
    const showError = () => {
            return (
                <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
                    {error}
                </div>

                    )
    }
    const showLoading = () => {
        return (
            loading && (<div className='alert alert-info'><h2>Loading...</h2></div>)
        )
    }

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
                        <input type="text" className='form-control' onChange={handleChange('name')} value={name}   />
                    </div>
                    <div className="form-group">
                        <label className="text-muted" >Description</label>
                        <textarea onChange={handleChange('description')} type="text" className='form-control' value={description}   />
                    </div>
                    <div className="form-group">
                        <label className="text-muted" >Price</label>
                        <input type="text" className='form-control' onChange={handleChange('price')} value={price}   />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Product category</label>
                        <select onChange={handleChange('category')} className="form-control">
                            <option>Please select option</option>
                            {categories && categories.map((category, index) =>( <option key={index} value={category._id}>{category.name}</option>))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Shipping</label>
                        <select onChange={handleChange('shipping')} className="form-control">
                            <option>Please select option</option>
                            <option value="0">NO</option>
                            <option value="1">YES</option>
                        </select>

                    </div>
                    <div className="form-group">
                        <label className="text-muted" >Quantity</label>
                        <input type="text" className='form-control' onChange={handleChange('quantity')} value={quantity}   />
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
                    {showError()}
                    {showSuccess()}
                    {loading  ?showError() : newProductForm()}
                </div>
            </div>


        </Layout>
    )
}

export default AddProduct


