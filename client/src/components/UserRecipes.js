import React, {useState,useEffect,useContext} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'

export const UserRecipes = () => {

    const {loggedUser} = useContext(UserContext);
    const [userRecipe,setUserRecipe] = useState([])
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/recipe/user/${id}`)
        .then(response => {
            console.log(response.data)
            setUserRecipe(response.data)
        })
        .catch(error => {
            console.log(error, 'nope')
        })
    },[])

    const removeRecipe = recipeId => {
        setUserRecipe(userRecipe.filter(recipe => recipe._id !== recipeId));
    }

    const deleteRecipe = recipeId => {
        axios.delete('http://127.0.01:8000/api/delete/' + recipeId)
        .then(response => {
            console.log(response)
            removeRecipe(recipeId)
        })
        .catch(error => {
            console.log(error)
        })
    }
    

    return (
        <div>
            {/* tested to see if the right user pulled up */}
            {/* {loggedUser.username} */}
            {
                userRecipe.map((recipe,index) => {
                    return(
                        <p key = {index}>
                            Recipe: {recipe.title}<br/>
                            Instructions: {recipe.instructions}<br/>
                            Ingredients: {recipe.ingredients}<br/>
                            Serves: {recipe.serves}<br/>
                            Prep Time: {recipe.prepTime}<br/>
                            Cook Time: {recipe.cookTime}<br/>
                            <Link to = {`/update/${recipe._id}`}>Update</Link>
                            <button onClick={(e) => deleteRecipe(recipe._id)}>Delete</button>
                        </p>
                    )
                })
            }
        </div>
    )
}
