import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './AddRecipe.css'
import Nav from "../Nav/Nav";

export const AddRecipe = () => {

    const { loggedUser, setLoggedUser} = useContext(UserContext);

    const navigate = useNavigate()

    const [newRecipe,setNewRecipe] = useState([]);
    const [title,setTitle] = useState('');
    const [instructions,setInstructions] = useState('');
    const [cookTime,setCooKTime] = useState('');
    const [ingredients,setIngredients] = useState('')
    const [prepTime,setPrepTime] = useState('')
    const [serves,setServes] = useState('')
    const [notes,setNotes] = useState('')

    const [errors, setErrors] = useState([])

    const addRecipe = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/addRecipe', {
            title,
            ingredients,
            instructions,
            cookTime,
            prepTime,
            serves,
            notes,
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
        <div className="add-bg">
        <Nav></Nav>
            <div className="error-container">
                {errors.map((error,index) => <p key = {index}>{error}</p>)}
            </div>
            <form onSubmit={addRecipe} className="add-form">
            <div className="add-left">
            <h1 className="add-title">Add a <span className="add-span">recipe.</span></h1>
                
                <label className="">Recipe Name</label>
                    <input type = 'text' value={title} onChange = {(e) => setTitle(e.target.value)}/>
                <hr></hr>

                <label className="">Servings</label>
                    <input type = 'text' value={serves} onChange = {(e) => setServes(e.target.value)}/>
                <hr></hr>

                <label className="">Prep Time</label>
                    <input type = 'text' value={cookTime} onChange = {(e) => setCooKTime(e.target.value)}/>
                <hr></hr>

                <label className="">Cook Time</label>
                    <input type = 'text' value={prepTime} onChange = {(e) => setCooKTime(e.target.value)}/>
            </div>

            <div className="add-right">
                <div className="add-right-container">
                    <label>Image</label>
                        <input type ='file' className="file-input"/>
                    <hr></hr>

                    <label className="">Ingredients</label>
                        <textarea type= 'text' value={ingredients} onChange = {(e) => setIngredients(e.target.value)}/>
                    <hr></hr>

                    <label>Instructions</label>
                        <textarea type = 'text' value={instructions} onChange = {(e) => setInstructions(e.target.value)}/>
                </div>
            </div>
                <input type='submit' className="button"></input>
            </form>
        </div>
    )
}


export default AddRecipe