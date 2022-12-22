import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Nav from '../Nav/Nav'
import './Login.css'

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
            navigate('/explore')
        }).catch((err) => {
            console.log(err)
            setErrors(err.response.data.error)
        })
    }

  return (
    <div className='bg'>
    <Nav></Nav>
        <form className='login-form' onSubmit={loginHandler} >
        <h4 className='registration-title'>Login</h4>
        <div className='register-card'>
            <label className='mt-2'>Email:</label>
            <input type='email' className='form-control' autoComplete='email' onChange={(e) => setEmail(e.target.value)}></input>
            <label className='mt-2'>Password:</label>
            <input type='password' className='form-control' autoComplete='password' onChange={(e) => setPassword(e.target.value)}></input>
            <div className='login-error-container'>
                <p>{errors}</p>
            </div>
            <button className='login-button'>Login</button>
            </div>
        </form>
        <div className='login-tab'>
        <h4 className='login-already'
            >Don't have an account? 
            <span className='register-span'>
                <a href='/register'>Register</a>
            </span>
        </h4>
        </div>
    </div>
  )
}

export default Login