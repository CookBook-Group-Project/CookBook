import axios from 'axios'
import React from 'react'
import { isRouteErrorResponse, useNavigate } from 'react-router-dom'
import { useState } from 'react'

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
            navigate('/main')
        }).catch((err) => {
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }

    return (
        <div style={{paddingTop: "100px"}}>
            <form className='mx-auto d-flex flex-column' onSubmit={registrationHandler}>
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
            </form>
        </div>
    )
}

export default Register