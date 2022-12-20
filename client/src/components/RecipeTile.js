import React from 'react'
import {Link, useParams} from 'react-router-dom'

const RecipeTile = (props) => {
    
    const {recipe} = props

    

    return (
        <div>
            <div>Recipe: {recipe.title}</div>
            <div>Instructions: {recipe.instructions}</div>
            <div>Prep Time: {recipe.prepTime}</div>
            <div>Cook TIme: {recipe.cookTime}</div>
            <div>Serves: {recipe.serves} people</div>
            <div>{recipe.image}</div>
        </div>
    )
}

export default RecipeTile