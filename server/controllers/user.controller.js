import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET_KEY

export default {

    registerUser: async (req,res) => {
        try{
            const newUser = await User.create(req.body)
            const userToken = jwt.sign({_id:newUser._id, email:newUser.email},SECRET)
            res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:'User logged in', user:newUser})
        }catch(error){
            console.log(error)
            res.status(400).json(error)
        }
    },

    loginUser: async (req,res) => {
        try{
            if(!req.body.email){
                return res.status(400).json({error:"Invalid email or password."})
            }
            const user = await User.findOne({email:req.body.email}).exec()
            const isPasswordValid = user && await bcrypt.compare(req.body.password, user.password)
            if(!isPasswordValid){
                return res.status(400).json({error:"Invalid email or password."})
            }
            const userToken = jwt.sign({_id:user._id,email:user.email},SECRET)
            res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:'User logged in', user:user})
        }catch(error){
            console.log(error)
            res.status(400).json({error:"Invalid email or password."})
        }
    },

    logOutUser: (req,res) =>{
        res.clearCookie('userToken')
        res.json({success:"User logged out."})
    }
}
