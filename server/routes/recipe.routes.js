import RecipeController from '../controllers/recipe.controller.js'
import {authenticate} from '../config/jwt.config.js'

export default (app) => {
    app.get('/api/allRecipes', RecipeController.getAllRecipes)
    app.get('/api/fiveRecipes', RecipeController.getFiveRecipes)
    app.get('/api/recipe/:id', RecipeController.getOneRecipe)
    app.post('/api/addRecipe', authenticate, RecipeController.addRecipe)
    app.get('/api/recipe/user/:id', authenticate, RecipeController.findUser)
    app.put('/api/update/:id', authenticate, RecipeController.updateRecipe)
    app.delete('/api/delete/:id', authenticate, RecipeController.deleteRecipe)
}
