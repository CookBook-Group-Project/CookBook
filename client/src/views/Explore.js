import React, {useState, useEffect} from 'react'
import axios from 'axios'
import RecipeCard from '../components/Recipe-Card/RecipeCard'
import Nav from '../components/Nav/Nav'

const Explore = () => {

    const [recipes,setRecipes] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/allRecipes', {withCredentials: true, credentials: 'include'})
        .then((res) => {
            console.log(res)
            setRecipes(res.data)
        }).catch((err) => {
            console.log(err)
        })
      },[])


  return (
    <div>
      <Nav />
      {
        recipes.map((recipe) => (
          <div key={recipe._id}>
            <RecipeCard recipe={recipe}/>
          </div>
        ))
      }
    </div>

  )
}

export default Explore