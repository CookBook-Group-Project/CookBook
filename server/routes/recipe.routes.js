const RecipeController = require('../controllers/recipe.controller')
const {authenticate, isLoggedIn} = require('../config/jwt.config')

module.exports = (app) => {
    app.get('/api/allRecipes', RecipeController.getAllRecipes)
    app.get('/api/recipe/:id', RecipeController.getOneRecipe)
    app.post('/api/addRecipe', authenticate, RecipeController.addRecipe)
    // app.post('/api/addRecipe', RecipeController.addRecipe)
    app.get('/api/recipe/user/:id', authenticate, RecipeController.findUser)
    app.put('/api/update/:id', authenticate, RecipeController.updateRecipe)
    app.delete('/api/delete/:id', authenticate, RecipeController.deleteRecipe)
}