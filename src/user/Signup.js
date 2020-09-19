import React, {useState} from "react";
import {Link} from "react-router-dom";
import Layout from "../core/Layout";
import {signup} from "../auth/index";

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    })
    const {name, email, password, success, error} =values
    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, errors: false})
        signup({name, email, password})
            .then(data => {
                if(data.error) {
                    setValues({...values, error: data.error})
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        success: true
                    })
                }
            })
    }


    const signUpForm = () => {
        return (
            <form>
                <div className="container">
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input value={name} onChange={handleChange('name')} type="text" className='form-control'/>
                    </div>
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
    const showSuccess = () => {
        return (
            <div className='alert alert-info' style={{display: success ? '' : 'none'}}>
                New account is created, please <Link to='/signin'>signin.</Link>
            </div>
        )
    }
    return (
        <Layout title='SignUp' description='Node React application' className='container col-md-4 offset-md-4'>
            {showError()}
            {showSuccess()}
            {signUpForm()}
            {/*{JSON.stringify(values)}*/}
        </Layout>
    )
}

export default Signup