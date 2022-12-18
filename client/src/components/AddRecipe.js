import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const AddRecipe = () => {

    const { loggedUser, setLoggedUser} = useContext(UserContext);

    const navigate = useNavigate()

    const [newRecipe,setNewRecipe] = useState([]);
    const [title,setTitle] = useState('');
    const [instructions,setInstructions] = useState('');
    const [cookTime,setCooKTime] = useState('');
    const [ingredients,setIngredients] = useState('')
    const [errors, setErrors] = useState([])

    const addRecipe = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/addRecipe', {
            title,
            ingredients,
            instructions,
            cookTime,
            creator: loggedUser.id
        })
        .then(response => {
            console.log(response.data)
            setNewRecipe([...newRecipe,response.data])

        })
        .catch(error => {
            console.log(error, 'failed to add')
            const errorResponse = error.response.data.errors;
            console.log(errorResponse)
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message);
            }
            setErrors(errorArr)
        })
    }

    return (
        <div>
            <form onSubmit={addRecipe}>
                {errors.map((error,index) => <p key = {index}>{error}</p>)}
                <label>Recipe Name</label>
                <input type = 'text' placeholder='Name' value={title} onChange = {(e) => setTitle(e.target.value)}/>
                <label>Ingredients</label>
                <input type = 'text' placeholder='Name' value={ingredients} onChange = {(e) => setIngredients(e.target.value)}/>
                <label>Instructions</label>
                <input type = 'textarea' value={instructions} onChange = {(e) => setInstructions(e.target.value)}/>
                <label>Estimated Cooking Time</label>
                <input type = 'text' value={cookTime} onChange = {(e) => setCooKTime(e.target.value)}/>
                <input type = 'image' />
                <input type = 'submit'/>
            </form>
        </div>
    )
}


export default AddRecipe