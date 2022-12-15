const Recipe = require('../models/recipe.model')

module.exports = {

    getAllRecipes: (req,res)=>{
        Recipe.find().sort({createdAt:-1})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    getOneRecipe: (req,res)=>{
        Recipe.findById(req.params.id)
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    addRecipe: (req,res)=> {
        // console.log(req.body)
        Recipe.create(req.body)
        .then((result)=>{
            // console.log(result)
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    updateRecipe:(req,res)=>{
        Recipe.updateOne({_id:req.params.id}, req.body, {new:true, runValidators:true})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    deleteRecipe:(req,res)=>{
        Recipe.deleteOne({_id:req.params.id})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    spotifySearch:(req,res)=>{

    }
}