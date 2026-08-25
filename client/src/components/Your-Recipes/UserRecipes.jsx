import React, {useState,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import api from "../../config/api";
import Nav from '../Nav/Nav'
import RecipeTile from '../Recipe-Tile/RecipeTile'
import './UserRecipes.css'


export const UserRecipes = () => {

    const {loggedUser} = useContext(UserContext);
    const [userRecipe,setUserRecipe] = useState([])

    useEffect(() => {
        api
        .get(`/api/recipe/user/${loggedUser.id}`)
        .then(response => {
            setUserRecipe(response.data)
        })
        .catch(error => {
            console.log(error, 'nope')
        })
    },[loggedUser.id])

    const removeRecipe = recipeId => {
        setUserRecipe(userRecipe.filter(recipe => recipe._id !== recipeId));
    }

    const deleteRecipe = recipeId => {
        api.delete(`/api/delete/${recipeId}`)
        .then(() => {
            removeRecipe(recipeId)
        })
        .catch(error => {
            console.log(error)
        })
    }
    

    return (
        <div className='your-recipes-container'>
        <Nav/>
            <div className='your-recipes-title'>
                <h2>{loggedUser.username}'s Recipe</h2>
            </div>
            {
                userRecipe.map((recipe,index) => {
                    return(
                        <div className='your-recipes-card' key = {index} >
                        <RecipeTile recipe={recipe}/>
                            <Link to = {`/update/${recipe._id}`} className='your-recipes-link'>Update</Link>
                            <button onClick={(e) => deleteRecipe(recipe._id)} className='your-recipes-delete'>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
