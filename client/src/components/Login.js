import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors,setErrors] = useState('')

  const loginHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/login",{
            email,
            password,
        },{withCredentials:true, credentials:'include'})
        .then((res) => {
            console.log("User logged in")
            navigate('/main')
        }).catch((err) => {
            console.log(err)
            setErrors(err.response.data.error)
        })
    }

  return (
    <div>
        <div style={{paddingTop: "100px"}}>
            <form className='mx-auto d-flex flex-column' onSubmit={loginHandler}>
                <label>Email:</label>
                <input type='email' className='form-control' autoComplete='email' onChange={(e) => setEmail(e.target.value)}></input>
                <label className='mt-2'>Password:</label>
                <input type='password' className='form-control' autoComplete='password' onChange={(e) => setPassword(e.target.value)}></input>
                <button className='btn btn-primary mt-3'>Login</button>
                <p className='text-danger mt-4 p-0'>{errors}</p>
            </form>
        </div>

    </div>
  )
}

export default Login