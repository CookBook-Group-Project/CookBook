import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav'
import './UpdateRecipe.css'

export const UpdateRecipe = () => {
    const {id} = useParams()
    const [title,setTitle] = useState('')
    const [instructions,setInstructions] = useState('')
    const [cookTime,setCookTime] = useState('')
    const [prepTime,setPrepTime] = useState('')
    const [serves,setServes] = useState('')
    const [mainImage,setMainImage] = useState('')
    const [ingredients,setIngredients] = useState('')
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipe/${id}`, {withCredentials:true})
        .then(response => {
            console.log(response)
            setTitle(response.data.title)
            setInstructions(response.data.instructions)
            setCookTime(response.data.cookTime)
            setPrepTime(response.data.prepTime)
            setServes(response.data.serves)
            setIngredients(response.data.ingredients)
        })
        .catch(error => {
            console.log(error)
        })
    },[])

    const updateRecipe = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/update/${id}`, {
            title,
            instructions,
            serves,
            prepTime,
            ingredients,
            cookTime
        },{withCredentials:true, credentials:'include'})
        .then(response => {
            console.log(response)
            navigate('/explore')
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


        //switching image upload 
    
        const handleFile = () =>{
            const file = document.querySelector('.file-input')
            
            file.style.display = 'block'
        }
        
        const handleUrl = () =>{
            const url = document.querySelector('.url-input')
            
            url.style.display = 'block'
    
        }


    return (
        <div className="add-bg">
        <Nav/>
            <div className="error-container">
                {errors.map((error,index) => <p key = {index}>{error}</p>)}
            </div>
            <form onSubmit={updateRecipe} className="add-form">
            <div className="edit-left">
            <h1 className="edit-title">Edit your <span className="add-span">recipe.</span></h1>
                <div className='left-container'>
                <label className="">Recipe Name</label>
                    <input type = 'text' value={title} onChange = {(e) => setTitle(e.target.value)}/>
                <hr></hr>

                <label className="">Servings</label>
                    <input type = 'text' value={serves} onChange = {(e) => setServes(e.target.value)}/>
                <hr></hr>

                <label className="">Prep Time</label>
                    <input type = 'text' value={prepTime} onChange = {(e) => setPrepTime(e.target.value)}/>
                <hr></hr>

                <label className="">Cook Time</label>
                    <input type = 'text' value={cookTime} onChange = {(e) => setCookTime(e.target.value)}/>
                    </div>
            </div>

            <div className="add-right">
                <div className="add-right-container">
                    <div className="image-selection-container">
                    <label className="image-label">Image</label>
                        <span className="file-selector" onClick={handleFile}>file</span>
                        <span className="url-selector" onClick={handleUrl}>url</span>
                    </div>
                        <input type ='file' className="file-input" onChange = {(e) => setMainImage(e.target.value)}/>
                        <input type ='text' className="url-input" onChange = {(e) => setMainImage(e.target.value)}/>
                    <hr></hr>

                    <label className="">Ingredients</label>
                        <textarea type= 'text' 
                            value={ingredients} 
                            onChange = {(e) => setIngredients(e.target.value)}/>
                    <hr></hr>

                    <label>Instructions</label>
                        <textarea type = 'text' 
                        value={instructions} 
                        placeholder=''
                        onChange = {(e) => setInstructions(e.target.value)}/>
                </div>
            </div>
                <input type='submit' className="button"></input>
            </form>
        </div>
    )
}
