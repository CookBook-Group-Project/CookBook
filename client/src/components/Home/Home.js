import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Nav from '../Nav/Nav'
import axios from 'axios'
import circle from './Images/orange-circle.png'
import family from './Images/family.png'
import quick from './Images/quick.png'
import together from './Images/together.png'


const Home = () => {

  const [recipes,setRecipes] = useState([])


  useEffect(() => {
    axios.get('http://localhost:8000/api/fiveRecipes', {withCredentials: true, credentials: 'include'})
    .then((res) => {
        console.log(res)
        setRecipes(res.data)
    }).catch((err) => {
        console.log(err)
    })
  },[])


  const handleHover = () =>{
    const homeCardContainer = document.querySelector('.home-card-description-container')

    homeCardContainer.style.display = 'block'
  }

  return (

    <div className='bg'>

    {/* Top - Image */}
    <Nav></Nav>
      <img src={circle} alt='circle' className='orange-circle'></img>
        <div className="container">
          <img className="smoke" src= "https://www.dif.co.th/wp-content/uploads/revslider/sport-smoke.png" alt='smoke'/>
        </div>
        <div className="container">
          <img className="smoke" src= "https://www.dif.co.th/wp-content/uploads/revslider/sport-smoke.png" alt='smoke'/>
        </div>
        <div className='image-container'>
          <div className="column" id="bg-img">
            <div className="typewriter">CookBook<span className='span'>.</span></div>
          </div>
        </div>



      {/* Cards container - Gray Box */}
        <section className='triangle'>
        <div className="card-container">

        {
        recipes.map(
          (recipe) => (
          <div key={recipe._id}>
            <div className="card"
              onMouseOver={handleHover}>
              <h3 className="title">{recipe.title}</h3>
              <div className="bar">
                <div className="emptybar"></div>
                <div className="filledbar"></div>
              </div>
              <div className="home-cards-image-container">
                <img src={recipe.mainImage}
                                    onError={event => {
                        event.target.src = "https://images.unsplash.com/photo-1516824467205-afa656d31a79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZCUyMGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                        event.onerror = null
                    }}
                className='home-cards-image'
                alt='home' ></img>
              </div>
              <Link to={`/recipe/${recipe._id}`} className='home-card-link'>View Recipe</Link>

            </div>
            <div className='home-card-description-container'>
            <a href='/explore'>Want to explore more recipes ?</a>
          </div>
          </div>
          )
        )
      }
        </div>

    </section>

    {/* Lower Container */}
    <section className="full-height">
          <div className="column" id="col-places">
            <div id="col-images">
              <div className="col-text">
                <div>
                  <img src={together} alt='together'/>
                </div>
                  <p>Cook up something with a friend or family member.</p>
              </div>
              <div className="col-text">
                  <div>
                    <img src={quick} alt='quick'/>
                  </div>
                  <p>In a hurry ? We have recipes you can do in under 30 mins !</p>
              </div>
              <div className="col-text">
                <div>
                  <img src={family} alt='family'/>
                </div>
                <p>Store your family's recipes to share with your friends. </p>
              </div>
            </div>
          </div>
          </section>
      </div>
  )
}

export default Home