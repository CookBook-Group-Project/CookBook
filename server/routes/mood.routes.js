const RecipeController = require('../controllers/recipe.controller')
const {authenticate, isLoggedIn} = require('../config/jwt.config')

module.exports = (app) => {
    app.get('/api/allRecipes', authenticate, RecipeController.getAllRecipes)
    app.get('/api/recipe/:id', authenticate, RecipeController.getOneRecipe)
    app.post('/api/addRecipe', authenticate, RecipeController.addRecipe)
    app.put('/api/update/:id', authenticate, RecipeController.updateRecipe)
    app.delete('/api/delete/:id', authenticate, RecipeController.deleteRecipe)
}