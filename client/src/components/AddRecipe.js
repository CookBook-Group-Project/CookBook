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
            navigate('/explore')
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
            {/*Grant 17DEC2022 - I added the block below to help see work being done on the component due to the navigation styling. This can be deleted once complete. */}
            <div style={{height:"90px", background: "white"}}></div>
            <form onSubmit={addRecipe} className="col-6 d-flex flex-column">
                {errors.map((error,index) => <p key = {index}>{error}</p>)}
                <label className="mt-2">Recipe Name</label>
                <input type = 'text' value={title} onChange = {(e) => setTitle(e.target.value)}/>
                <label className="mt-2">Ingredients</label>
                <input type = 'text' value={ingredients} onChange = {(e) => setIngredients(e.target.value)}/>
                <label className="mt-2">Instructions</label>
                <input type = 'textarea' value={instructions} onChange = {(e) => setInstructions(e.target.value)}/>
                <label className="mt-2">Estimated Cooking Time</label>
                <input type = 'text' value={cookTime} onChange = {(e) => setCooKTime(e.target.value)}/>
                <input type ='file' className="mt-4"/>
                <input type = 'submit' className="mt-4"/>
            </form>
        </div>
    )
}


export default AddRecipe