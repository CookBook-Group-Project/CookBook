import React, {useState, useEffect} from 'react'
import api from "../config/api";
import RecipeTile from '../components/Recipe-Tile/RecipeTile'
import Nav from '../components/Nav/Nav'

const Explore = () => {

    const [recipes,setRecipes] = useState([])

    useEffect(() => {
        api.get('/api/allRecipes')
        .then((res) => {
            setRecipes(res.data)
        }).catch((err) => {
            console.log(err)
        })
      },[])

      //the css for this file is in app.css


  return (
    <div>
      <Nav/>
      <div className='animation-container'>
      <h1>Let's Cook...</h1>
        <div id="cooking">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div id="area">
            <div id="sides">
              <div id="pan"></div>
              <div id="handle"></div>
            </div>
            <div id="pancake">
              <div id="pastry"></div>
              <div className='cook-book'>Cook Book<span className='orange'>.</span></div>
            </div>
            </div>
          </div>
      </div>
      <div className='all-recipes-container' >
      {
        recipes.map(
          (recipe) => (
          <div key={recipe._id}>
            <RecipeTile recipe={recipe}/>
          </div>
          )
        )
      }
    </div>
    </div>

  )
}

export default Explore