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
    let {id} = useParams();

    // 639fd3ce9d1a54c764f79aed
    // 63c8f7919bdb29714a11ca4d
    
    useEffect(() => {
        if (id != loggedUser.id){
            id = loggedUser.id
        }
        axios
        .get(`http://localhost:8000/api/recipe/user/${loggedUser.id}`, {withCredentials:true})
        .then(response => {
            console.log(response.data)
            setUserRecipe(response.data)
        })
        .catch(error => {
            console.log(error, 'nope')
        })
    },[id, loggedUser.id])

    const removeRecipe = recipeId => {
        setUserRecipe(userRecipe.filter(recipe => recipe._id !== recipeId));
    }

    const deleteRecipe = recipeId => {
        axios.delete(`http://localhost:8000/api/delete/${recipeId}`, {withCredentials:true, credentials:'include'})
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
