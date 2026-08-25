import UserController from '../controllers/user.controller.js'
import {isLoggedIn} from '../config/jwt.config.js'

export default (app) => {
    app.post('/api/register', UserController.registerUser)
    app.post('/api/login', UserController.loginUser)
    app.get('/api/getLoggedUser', isLoggedIn)
    app.get('/api/logout', UserController.logOutUser)
}
