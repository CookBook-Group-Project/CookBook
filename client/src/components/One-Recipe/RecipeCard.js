import Nav from '../Nav/Nav'
import './RecipeCard.css'
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";

const RecipeCard = (props) => {

    const { id } = useParams();

    const [recipe, setRecipe] = useState([]);
    const [notFoundError, setNotFoundError] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/recipe/${id}`, {
            withCredentials: true,
            })
            .then((res) => {
            console.log(res);
            setRecipe(res.data);
            })
            .catch((err) => {
            console.log(err);
            setNotFoundError("The recipe you are looking for does not exist.");
            });
        }, [ ]);

    //We pull down the list of all recipes via props so that cards can be generated for each.
    // const {recipe} = props


    // Switching between image and directions view 
    const handleClick = () =>{
        const recImg = document.querySelector('.image-container')
        // const directions = document.querySelector('.directions-container')
        const show = document.querySelector('.show-directions')
        const hidden = document.querySelector('.hidden-container')


        recImg.style.display = 'none'
        // directions.style.display = 'block'
        show.innerHTML = 'Currently Cooking'
        hidden.style.display = 'block'
    }


    return (
        <div>
            <Nav></Nav>
            {/* Overall Container  */}
            {notFoundError?
            <div className='not-found'>
                <p>A recipe with that ID was not found.</p>
            </div>
            :
            <>
                <div className='recipe-card-container'>
                {/* Left Container */}
                    <div className='recipe-card-left'>
                        <div className='left-title'>
                            <h1>Directions and</h1>
                            <h2>ingredients.</h2>
                        </div>
                        <div className='recipe-card'>
                            <div className='recipe-card-top'>
                                <h3>Servings 
                                    <span className='card-span'>{recipe.serves}</span>
                                </h3>
                                <h3>Prep Time 
                                    <span className='card-span'>{recipe.prepTime}</span>
                                </h3>
                                <h3>Cook Time 
                                    <span className='card-span'>{recipe.cookTime}</span>
                                </h3>
                            </div>
                            <div className='recipe-card-bottom'>
                                <h1>Ingredients Needed</h1>
                                <p>{recipe.ingredients}</p>
                            </div>
                            <div className='directions-container'>
                                <p className='directions-title'>Directions</p>
                                <p className='directions-text'>{recipe.instructions}</p>
                            </div>
                            {/* <h2 className='show-directions' onClick={handleClick}>Show Directions</h2> */}
                        </div>
                    </div>
                    {/* Right Container  */}
                    <div className='recipe-card-right'>
                    <div className='card-right-container'>
                        <h3 className='recipe-title'>{recipe.title}</h3>
                        <hr className='recipe-title-divider'></hr>
                        <div className='image-container'>
                            <img src={recipe.mainImage}
                                onError={event => {
                                    event.target.src = "https://images.unsplash.com/photo-1516824467205-afa656d31a79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZCUyMGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                                    event.onerror = null
                                }}
                                alt='main' className='recipe-card-image'></img>
                        </div>
                    </div>
                    </div>
                </div>
            </>
            }

        </div>
    )
}

export default RecipeCard