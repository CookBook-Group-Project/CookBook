const UserController = require('../controllers/user.controller');
const {authenticate, isLoggedIn} = require('../config/jwt.config')

module.exports = (app) => {
    app.post('/api/register', UserController.registerUser),
    app.post('/api/login', UserController.loginUser)
    app.get('/api/getLoggedUser', isLoggedIn)
    app.get('/api/logout', UserController.logOutUser)
}