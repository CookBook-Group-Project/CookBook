import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const UpdateRecipe = () => {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [instructions,setInstructions] = useState('');
    const [cookTime,setCooKTime] = useState('');
    const [ingredients,setIngredients] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipe/${id}`)
        .then(response => {
            console.log(response)
            setTitle(response.data.title)
            setInstructions(response.data.instructions)
            setCooKTime(response.data.cookTime)
            setIngredients(response.data.ingredients)
        })
        .catch(error => {
            console.log(error)
        })
    })

    const updateRecipe = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/recipe/${id}`, {
            title,
            instructions,
            ingredients,
            cookTime
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error, 'failed to update')
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
            <form onSubmit={updateRecipe} style={{display:'flex',flexDirection:'column'}}>
                {errors.map((error,index) => <p key = {index}>{error}</p>)}
                <label>Recipe Name</label>
                <input type = 'text' placeholder='Name' value={title} onChange = {(e) => setTitle(e.target.value)}/>
                <label>Ingredients</label>
                <input type = 'text' placeholder='' value={ingredients} onChange = {(e) => setIngredients(e.target.value)}/>
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
