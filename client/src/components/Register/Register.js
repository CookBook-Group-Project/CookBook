import axios from 'axios'
import React from 'react'
import { isRouteErrorResponse, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Register.css'

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


    const loginHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/login",{
            email,
            password,
        },{withCredentials:true, credentials:'include'})
        .then((res) => {
            console.log("User logged in")
            navigate('/explore')
        }).catch((err) => {
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }

    // Styling for switching between register and login  

    const tab = document.querySelector('.tab')
    const form = document.querySelector('.register-form')

    const handleRegister = (e) =>{
        tab.style.zIndex = '1'
        form.style.zIndex = '2'
    }

    const handleLogin = (e) =>{
        tab.style.zIndex = '2'
        form.style.zIndex = '1'
    }

    return (
        <div className='bg'>
            <form className='register-form' onSubmit={registrationHandler} onClick={handleRegister}>
            <h4 className='registration-title'>Need to register ?</h4>
            <div className='register-card'>
                <label>Username:</label>
                <input type='text' className='form-control' onChange={(e) => setUsername(e.target.value)}></input>
                {errors.username && <p className='text-danger mt-4 p-0'>{errors.username.message}</p>}
                <label className='mt-2'>Email:</label>
                <input 
                type='text' 
                className='form-control' 
                onChange={(e) => setEmail(e.target.value)}/>
                {errors.email && <p className='text-danger mt-4 p-0'>{errors.email.message}</p>}
                <label className='mt-2'>Password:</label>
                <input 
                type='text' 
                className='form-control' 
                onChange={(e) => setPassword(e.target.value)}/>
                {errors.password && <p className='text-danger mt-4 p-0'>{errors.password.message}</p>}
                <label className='mt-2'>Confirm Password:</label>
                <input 
                type='text' 
                className='form-control' 
                onChange={(e) => setConfirmPassword(e.target.value)}/>
                {errors.confirmPassword && <p className='text-danger mt-4 p-0'>{errors.confirmPassword.message}</p>}
                <button className='btn btn-primary mt-3'>Register</button>
                </div>
            </form>
            <div className='tab'>
            <form className='login-form' onSubmit={loginHandler}>
            <h4 className='login-title'>Login</h4>
                <label>Email:</label>
                <input type='email' className='form-control' autoComplete='email' onChange={(e) => setEmail(e.target.value)}></input>
                <label className='mt-2'>Password:</label>
                <input type='password' className='form-control' autoComplete='password' onChange={(e) => setPassword(e.target.value)}></input>
                <button className='btn btn-primary'>Login</button>
                {/* <p className='text-danger mt-4 p-0'>{errors}</p> */}
            </form>
            <h4 className='already' onClick={handleLogin}>Already registered? Login</h4>
            </div>
        </div>
    )
}

export default Register