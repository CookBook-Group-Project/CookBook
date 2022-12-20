import React from 'react'

const RecipeTile = (props) => {

    const {recipe} = props

    return (
        <div>
            <div>{recipe.title}</div>
            <div>{recipe.image}</div>
        </div>
    )
}

export default RecipeTile