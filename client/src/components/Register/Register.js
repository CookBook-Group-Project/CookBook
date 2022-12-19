import axios from 'axios'
import React from 'react'
import { isRouteErrorResponse, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Register.css'
import Nav from '../Nav/Nav'

const Register = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    const registrationHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/register",{
            username,
            email,
            password,
            confirmPassword
        },{withCredentials:true, credentials:'include'})
        .then((res) => {
            navigate('/explore')
        }).catch((err) => {
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }



    return (
        <div className='bg'>
        <Nav></Nav>
            <form className='register-form' onSubmit={registrationHandler} >
            <h4 className='registration-title'>Create An Account</h4>
            <div className='register-card'>
                <label>Username:</label>
                <input type='text' className='form-control' onChange={(e) => setUsername(e.target.value)}></input>
                <label className='mt-2'>Email:</label>
                <input 
                type='text' 
                className='form-control' 
                onChange={(e) => setEmail(e.target.value)}/>
                <label className='mt-2'>Password:</label>
                <input 
                type='text' 
                className='form-control' 
                onChange={(e) => setPassword(e.target.value)}/>
                <label className='mt-2'>Confirm Password:</label>
                <input 
                type='text'
                className='form-control' 
                onChange={(e) => setConfirmPassword(e.target.value)}/>
                <div className='registration-error-container'>
                    {errors.username && <p>{errors.username.message}</p>}
                    {errors.email && <p>{errors.email.message}</p>}
                    {errors.password && <p>{errors.password.message}</p>}
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>
                <button className='btn btn-primary mt-3'>Register</button>
                </div>
            </form>
            <div className='tab'>
            <h4 className='already'
                >Already registered? 
                <span className='login-span'>
                    <a href='/login'>Login</a>
                </span>
            </h4>
            </div>
        </div>
    )
}

export default Register