const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
const User = require('../models/user.model')

module.exports.authenticate = (req, res, next) => {
    console.log("req.cookies follows", req)
    jwt.verify(req.cookies.userToken, SECRET, (err, payload) => {
        if (err) {
            console.log(err)
            console.log('Authentication error!')
            res.status(401).json({verified:false});
        }else{
            req.Token = payload
            console.log("Authentication successful!")
            next();
        }
    });
}

module.exports.isLoggedIn = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.userToken, {complete: true });
    User.findById(decodedJWT.payload._id)
    .then(user => 
        // console.log(user)
        res.json({user:user}))
    .catch(err => res.status(400).json(err));
}