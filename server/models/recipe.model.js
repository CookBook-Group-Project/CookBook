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

    postedBy:{
        type: String,
        // required:[true, "Must be logged in to post a mood."]
    },

    postedByID:{
        type: String,
        // required:[true, "Must be logged in to post a mood."]
    }
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }

},
{timestamps: true})

module.exports = mongoose.model('Recipe', RecipeSchema)