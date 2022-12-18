const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({

    title: {
        type: String,
        required:[true, 'Recipe title is required.'],
        minLength: [2, 'Recipe title must be longer than 2 characters.']
    },

    ingredients: {
        type: String,
        required:[true,'Recipe ingredients are required.'],
        minLength: [6,'Recipe ingredients must be longer than 5 characters.']
    },

    instructions: {
        type: String,
        required:[true, 'Recipe instructions are required.'],
        minLength: [10, 'Recipe instructions field must be longer than 9 characters.']
    },

    prepTime: {
        type: String
    },

    cookTime: {
        type: String
    },

    serves: {
        type: String
    },

    notes: {
        type: String
    },

    mainImage:{
        type: String,
        // required:[true, 'An Image is required.']
    },

    creatorImage:{
        type: String
    },

    originalRecipeImage:{
        type: String
    },

    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true, 'Must be logged in to add a recipe.'],
    }
    
    // postedBy:{
    //     type: String,
    //     // required:[true, "Must be logged in to post a recipe."]
    // },

    // postedByID:{
    //     type: String,
    //     // required:[true, "Must be logged in to post a recipe."]
    // }

},
{timestamps: true})

module.exports = mongoose.model('Recipe', RecipeSchema)