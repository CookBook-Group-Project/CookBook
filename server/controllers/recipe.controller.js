const Recipe = require('../models/recipe.model')
const User = require('../models/user.model')

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

    addRecipe: async (req,res)=> {
        try{
            console.log(req.body)
            const newRecipe = new Recipe(req.body);
            await newRecipe.save();
            // const recipeCreator = await User.findById({_id: newRecipe.creator});
            // let creatorPush = recipeCreator.recipes.push(newRecipe);
            // recipeCreator.recipes.push(newRecipe)
            // await recipeCreator.updateOne()
            // await recipeCreator
            // await recipeCreator.save({validateBeforeSave:false});
            res.status(200).json({success:true, data:newRecipe, user:newRecipe.creator.username});
        } catch(err){
            console.log(err);
            res.status(400).json(err);
        }
    },
        // // console.log(req.body)
        // Recipe.create(req.body)
        // .then((result)=>{
        //     // console.log(result)
        //     res.json(result)
        // })

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
    }

}