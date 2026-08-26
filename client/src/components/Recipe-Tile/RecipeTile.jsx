import './RecipeTile.css'
import React from "react";
import {Link} from 'react-router-dom'

const RecipeTile = (props) => {

    const {recipe} = props

    return (
        <div className="recipe-tile-container">
            <div className="recipe-tile-card">
                <img
                    className="recipe-tile-image"
                    src={recipe.mainImage || undefined}
                    onError={event => {
                        event.target.src = "https://images.unsplash.com/photo-1516824467205-afa656d31a79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZCUyMGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                        event.onerror = null
                    }}
                    alt='recipe'>
                </img>

                <div className="recipe-tile-text">
                    <div className="card--title">
                        {recipe.title}
                        <hr></hr>
                    </div>
                    <div className='card-ingredients-container'>
                        <span className='ingredients-span'>Ingredients: </span>{recipe.ingredients}
                    </div>
                    <hr></hr>
                    <div className="card--sub">
                        <span className='directions-span'>Directions:</span> {recipe.instructions}
                    </div>
                    <Link to={`/recipe/${recipe._id}`} className='cta'>View Recipe</Link>
                    <hr></hr>
                    <p className='recipe-tile-author'>
                    <span className='created-by'>Recipe Created By: </span>
                    {recipe.creatorName}</p>
                </div>
            </div>
        </div>
    )
}

export default RecipeTile