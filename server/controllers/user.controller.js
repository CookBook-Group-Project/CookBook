const User = require('../models/user.model')
const Recipe = require('../models/recipe.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
// const {isLoggedUser} = require('../config/jwt.config')

module.exports = {

    registerUser: async (req,res) => {
        try{
            console.log('req body follows', req.body)
            const newUser = await User.create(req.body)
            console.log(newUser, "found")
            const userToken = jwt.sign({_id:newUser._id, email:newUser.email},SECRET)
            res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:'User logged in', user:newUser})
        }catch(error){
            console.log(error)
            res.status(400).json(error)
        }
    },

    loginUser: async (req,res) => {
        if(req.body.email){
            const user = await User.findOne({email:req.body.email}).exec()
            console.log(user)
            try{
                const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
                console.log(isPasswordValid)
                if(!isPasswordValid){
                    res.status(400).json({error:"Invalid email or password."})
                }else{
                    const userToken = jwt.sign({_id:user._id,email:user.email},SECRET)
                    console.log("User data follows:",user)
                    res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:'User logged in', user:user})
                }
            }catch(error){
                console.log(error)
                res.status(400).json({error:"Invalid email or password."})
            }
        }else{
            res.status(400).json({error:"Invalid email or password."})
        }
    },

    getAllRecipesByUser: (req,res)=>{
        console.log(req.params)
        Recipe.find({postedBy: req.params.username}).sort({createdAt:-1})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },

    logOutUser: (req,res) =>{
        res.clearCookie('userToken')
        // res.status(200).clearCookie('userToken').json({success:"User logged out."})
        res.json({success:"User logged out."})
    }
}