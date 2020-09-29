import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {getProfile, updateProfileBackend, updateProfileFrontend} from "./apiUser";
import {Redirect} from "react-router-dom";


const Profile = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        error: false,
        success: false
    })

    const {user, token} = isAuthenticated()

    const {name, email, password, error, success} = values
    const init = (userId) => {
        console.log(userId)
        getProfile(userId, token)
            .then(response => {
                if(response.error) {
                    setValues({...values, error: true})
                } else {
                    setValues({...values, name: response.name, email: response.email})
                }
            })
    }

    useEffect(() => {
        // We can reach userId two ways init(match.params.userId) OR init(user._id)
        init(match.params.userId)
    },[])

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        updateProfileBackend(match.params.userId, token, {name, email, password})
            .then(response => {
            if(response.error) {
                console.log(response.error)
            } else {
                updateProfileFrontend(response, () => {
                    setValues({...values, name: response.name, email: response.email, success: true})
                })
            }
        })
    }

    const redirectUser = (success) => {
        if(success) {
            return <Redirect to='/cart'/>
        }
    }


    const profileUpdate = (name, email, password) => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input onChange={handleChange('name')} type="text" className='form-control' value={name}/>
                </div>
                <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className='form-control' value={email}/>
                </div>
                <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className='form-control' value={password}/>
            </div>
                <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </form>
        )
    }

    return (
        <Layout title='Profile' description='Update your profile' className='container col-md-4 offset-md-4'>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    )
}
export default Profile


