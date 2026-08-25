const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
const User = require('../models/user.model')

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, SECRET, {algorithms:['HS256']}, (err, payload) => {
        if (err) {
            res.status(401).json({verified:false});
        }else{
            req.Token = payload
            next();
        }
    });
}

module.exports.isLoggedIn = (req, res) => {
    jwt.verify(req.cookies.userToken, SECRET, {algorithms:['HS256']}, (err, payload) => {
        if (err) {
            return res.status(401).json({verified:false});
        }
        User.findById(payload._id)
        .then(user => res.json({user:user}))
        .catch(err => res.status(400).json(err));
    });
}