import React, { useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { NavLink, useNavigate } from 'react-router-dom';
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import logo from './Images/logo.png'
import api from "../../config/api";



const Nav = () => {

const { loggedUser, setLoggedUser} = useContext(UserContext);

const navigate = useNavigate()

useEffect(() => {
  api
    .get("/api/getLoggedUser")
    .then((res) =>
      setLoggedUser({
        id: res.data.user._id,
        username: res.data.user.username,
      })
    )
    .catch((err) => console.log(err));
}, [setLoggedUser]);

  const handleClick = () =>{
    const navMenu = document.querySelector(".navbar-collapse");
    navMenu.classList.toggle("showMenu");
  }

  const handleLogout = (e) => {
    api
    .get("/api/logout")
    .then(() => {
      setLoggedUser("");
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    });
  }


  return (
    <div className='nav-bar'>
      <nav className="navbar">
        <button type="button" className="btn-bars" onClick={handleClick}>
          <span><FontAwesomeIcon icon={faBars}/></span>
        </button>
      <div className="navbar-collapse">
        <span className="btn-close" onClick={handleClick}>
          <i className='bx bx-x'></i>
        </span>
        <ul className="navbar-nav">
          <p className="logged-user">{loggedUser.username}</p>
            <li className="nav-item">
              <NavLink to='/' className='nav-link'>Home</NavLink>
            </li>
          <li className="nav-item">
          <NavLink to='/explore' className='nav-link'>Explore Recipes</NavLink>
          </li>
          {loggedUser&&
            <li className="nav-item">
              <NavLink to={`/recipes/loggedUser/${loggedUser.id}`} className="nav-link">Your Recipes</NavLink>
            </li>
          }
          {loggedUser&&
            <li className="nav-item">
              <NavLink to='/addRecipe' className='nav-link'>Add A Recipe</NavLink>
            </li>
          }
          {/* <li className="nav-item">
            <a href="#" className="nav-link">Settings</a>
          </li> */}
          {!loggedUser?
          <li className="nav-item">
            <NavLink to='/login' className='nav-link'>Login or Register</NavLink>
          </li>
          :
          <li className="nav-item">
            <a href="#" onClick={handleLogout} className="nav-link">Log Out</a>
          </li>
          }
        </ul>
      <div className="nav-social-icon">
        <a href="#"><i className='bx bxl-facebook-circle'></i></a>
        <a href="#"><i className='bx bxl-twitter'></i></a>
        <a href="#"><i className='bx bxl-pinterest-alt'></i></a>
        <a href="#"><i className='bx bxl-instagram'></i></a>
    </div>
  </div>
  </nav>
    <section className="main">
      <a href="/" className="site-name">
      <img src={logo} alt='logo' className='logo'></img>
        CookBook
        <span>.</span>
      </a>
    </section>
    </div>
  )
}

export default Nav