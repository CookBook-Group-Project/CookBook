import './RecipeTile.css'
import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import { UserContext } from "../../contexts/UserContext";



const RecipeTile = (props) => {
    
    const {recipe} = props
    const { loggedUser, setLoggedUser} = useContext(UserContext);


    return (
        <div class="recipe-tile-container">
            <div class="recipe-tile-card">
                <img class="recipe-tile-image" src={recipe.mainImage} alt='recipe'></img>
                {/* <img class="recipe-tile-image" src='https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60' alt='recipe'></img> */}
                <div class="recipe-tile-text">
                    <div class="card--title">
                        {recipe.title}
                    </div>
                    <div class="card--sub">
                        {recipe.instructions}
                    </div>
                    <Link to={`/recipe/${recipe._id}`} className='cta'>View Recipe</Link>
                    <p className='recipe-tile-author'>{recipe.creator}</p>
                </div>
            </div>
        </div>
    )
}

export default RecipeTile