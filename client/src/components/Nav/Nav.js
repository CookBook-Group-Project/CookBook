import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import logo from './logo.png'
import axios from 'axios'

const Nav = () => {

const navigate = useNavigate()

  const handleClick = () =>{
    const showBtn = document.querySelector(".btn-bars"),
    closeBtn = document.querySelector(".btn-close"),
    navMenu = document.querySelector(".navbar-collapse");
  showBtn.addEventListener("click", () => {
    navMenu.classList.add("showMenu");
  });
  closeBtn.addEventListener("click", () => {
    navMenu.classList.remove("showMenu");
  });

  }

  const handleLogout = (e) => {
    axios
    .get("http://localhost:8000/api/logout", { withCredentials: true })
    .then((res) => {
      console.log("Logged out on front end");
      // setLoggedUser("");
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    });
  }


  return (
    <div className='nav-bar'>
      <nav class="navbar">
        <button type="button" class="btn-bars" onClick={handleClick}> 
          <span><FontAwesomeIcon icon={faBars}/></span>
        </button>
      <div class="navbar-collapse">
        <span class="btn-close">
          <i class='bx bx-x'></i>
        </span>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="#" class="nav-link">Explore Recipes</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Your Recipes</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Add A Recipe</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Settings</a>
          </li>
          <li class="nav-item">
            <NavLink to='/login' className='nav-link'>Log In</NavLink>
          </li>
          <li class="nav-item">
            <a href="#" onClick={handleLogout} class="nav-link">Log Out</a>
          </li>
        </ul>
      <div class="nav-social-icon">
        <a href="#"><i class='bx bxl-facebook-circle'></i></a>
        <a href="#"><i class='bx bxl-twitter'></i></a>
        <a href="#"><i class='bx bxl-pinterest-alt'></i></a>
        <a href="#"><i class='bx bxl-instagram'></i></a>
    </div>
  </div>
  </nav>
    <section class="main">
      <a href="#" class="site-name">
      <img src={logo} alt='logo' className='logo'></img>
        CookBook 
        <span>.</span>
      </a>
    </section>
    </div>
  )
}

export default Nav