import React, {useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {createCategory} from "./apiAdmin";


const AddCategory = () =>
{
    const [categoryName, setCategoryName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // Destructure user and token from localstorage
    const {user, token} = isAuthenticated()

    const handleChange = (event) => {
        setError('')
        setCategoryName(event.target.value)
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setError('')
        setSuccess(false)
        //make request to api to create category
        createCategory(user._id, token, {name: categoryName})
            .then(response => {
                console.log(response)
                if(response.error) {
                    setError(true)
                }
                else {
                    setError(false)
                    setSuccess(true)
                }
            })

    }

    const showSuccess = () => {
        if(success) {
            return <h6 className='text-success'>Category {categoryName} Created</h6>
        }
    }
    const showError = () => {
        if(!success) {
            return <h6 className='text-danger'>Category name should be unique</h6>
        }
    }

    const newCategoryForm = () => {
        return (
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Add category</label>
                    <input onChange={handleChange} type="text" className="from-control" value={categoryName} autoFocus required/>
                    {`Input value: ${categoryName}`}
                </div>
                <button className="btn btn-outline-primary">Create Category</button>

            </form>
        )
    }

    return (
        <Layout title='Add a new category' description={`${user.name} dashboard.`} className='container'>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {newCategoryForm()}
                </div>
            </div>


        </Layout>
    )
}

export default AddCategory


