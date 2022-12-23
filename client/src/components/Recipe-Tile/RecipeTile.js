import './RecipeTile.css'
import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import { UserContext } from "../../contexts/UserContext";



const RecipeTile = (props) => {


    // const handleImage = () =>{
    // const  img = document.getElementById("image")
    // img.addEventListener('error', function(event) {
    //     event.target.src = 'https://images.unsplash.com/photo-1516824467205-afa656d31a79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZCUyMGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
    //     event.onerror = 'null'
    // })
    // }



    const {recipe} = props
    const { loggedUser, setLoggedUser} = useContext(UserContext);


    return (
        <div class="recipe-tile-container">
            <div class="recipe-tile-card">
                <img
                    class="recipe-tile-image"
                    src={recipe.mainImage} 
                    onError={event => {
                        event.target.src = "https://images.unsplash.com/photo-1516824467205-afa656d31a79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZCUyMGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                        event.onerror = null
                    }}
                    alt='recipe'>
                </img>
                
                <div class="recipe-tile-text">
                    <div class="card--title">
                        {recipe.title}
                        <hr></hr>
                    </div>
                    <div className='card-ingredients-container'>
                        <span className='ingredients-span'>Ingredients: </span>{recipe.ingredients}
                    </div>
                    <hr></hr>
                    <div class="card--sub">
                        <span className='directions-span'>Directions:</span> {recipe.instructions}
                    </div>
                    <Link to={`/recipe/${recipe._id}`} className='cta'>View Recipe</Link>
                    <p className='recipe-tile-author'>
                    <hr></hr>
                    <span className='created-by'>Recipe Created By: </span>
                    {recipe.creatorName}</p>
                </div>
            </div>
        </div>
    )
}

export default RecipeTile