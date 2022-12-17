import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AddRecipe } from './AddRecipe'

const Login = () => {
  
  const navigate = useNavigate()

  // Separate state needed for the two forms
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors,setErrors] = useState({})

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
            setErrors(err.response.data.error)
            console.log(errors)
        })
    }

  return (
    <div>
        <nav className="navbar navbar-expand-sm bg-dark">
            <div className="container-fluid">
                <div className="navbar-nav ms-2">
                <a className="navbar-brand text-warning" href="/welcome"><strong>Scribe</strong></a>
                </div>
            </div>
        </nav>
        <div className='container bg-secondary bg-opacity-25 rounded p-4 mt-5' style={{width:"400px"}}>
            <h2 className='text-center'>Login</h2>
            <form className='mx-auto d-flex flex-column' onSubmit={loginHandler}>
                <label>Email:</label>
                <input type='email' className='form-control' autoComplete='email' onChange={(e) => setEmail(e.target.value)}></input>
                <label className='mt-2'>Password:</label>
                <input type='password' className='form-control' autoComplete='password' onChange={(e) => setPassword(e.target.value)}></input>
                <button className='btn btn-primary mt-3'>Login</button>
                <AddRecipe />
                {/* <p className='text-danger mt-4 p-0'>{errors}</p> */}
                {/* Error Notice: The error statement above appears to break the app.  */}
                {/* Will need the login error structure built for registration too... */}
            </form>
        </div>

    </div>
  )
}

export default Login