import React, {useState} from "react";
import Layout from "../core/Layout";
import {authenticateUser, signin} from "../auth";
import {Redirect} from "react-router-dom";


const Signin = () => {
    const [values, setValues] = useState({
        email: '123@123.com',
        password: '123@123.com',
        error: '',
        loading: false,
        redirectToRefferer: false,
    })
    const {email, password, loading, error, redirectToRefferer} =values
    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, errors: false, loading: true})
        signin({email, password})
            .then(data => {
                if(data.error) {
                    setValues({...values, error: data.error, loading: false})
                } else {
                    // Put jwt token to local storage + return default values
                    authenticateUser(data, () => {
                        setValues({
                            ...values,
                            redirectToRefferer: true
                        })
                    })

                }
            })
    }


    const signUpForm = () => {
        return (
            <form>
                <div className="container">
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input value={email} onChange={handleChange('email')} type="email" className='form-control'/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input value={password} onChange={handleChange('password')} type="password" className='form-control'/>
                    </div>
                    <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
                </div>
            </form>
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
            loading && (<div className='alert alert-info'>
                <h2>Loading...</h2>
            </div>)
        )
    }

    const redirectUser = () => {
        if(redirectToRefferer) {
            return <Redirect to='/' />
        }
    }
    return (
        <Layout title='SignIn' description='Node React application' className='container col-md-4 offset-md-4'>
            {showError()}
            {showLoading()}
            {redirectUser()}
            {signUpForm()}
            {/*{JSON.stringify(values)}*/}
        </Layout>
    )
}
export default Signin


