import Recipe from '../models/recipe.model.js'
import User from '../models/user.model.js'

export default {

    getAllRecipes: (req,res)=>{
        Recipe.find().sort({createdAt:-1})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    getFiveRecipes: (req,res)=>{
        Recipe.find().sort({createdAt:-1}).limit(5)
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
            const newRecipe = new Recipe(req.body);
            await newRecipe.save();
            const recipeCreator = await User.findById(newRecipe.creator);
            if(!recipeCreator){
                return res.status(400).json({error:'Recipe creator does not exist.'})
            }
            await recipeCreator.updateOne({recipes:[...recipeCreator.recipes, newRecipe]});
            res.status(200).json({success:true, data:newRecipe, user:recipeCreator.username});
        } catch(err){
            console.log(err);
            res.status(400).json({error: err.message || 'Failed to add recipe.'});
        }
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

    findUser: (request,response) => {
        Recipe.find({creator:request.params.id})
        .then(recipes => {
            response.json(recipes)
        })
        .catch(error => {
            console.log(error)
            response.status(400).json(error)
        })
    }

}
