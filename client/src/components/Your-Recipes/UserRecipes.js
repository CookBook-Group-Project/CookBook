import React, {useState,useEffect,useContext} from 'react'
import { useParams, Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import axios from 'axios'
import Nav from '../Nav/Nav'
import RecipeTile from '../Recipe-Tile/RecipeTile'
import './UserRecipes.css'


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
