import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateWebToken from '../utils/generateToken.js';

const userLogin = asyncHandler(async (req, res) => {
   const { email, password} = req.body;
   const user = await User.findOne({ email })
   if (user && await user.matchPasswords(password)) {
       res.send ({
           _id: user._id,
           email: user.email,
           name: user.name,
           isAdmin: user.isAdmin,
           token: generateWebToken(user._id)
       })
   } else {
       res.status(401)
     throw new Error('email or Password incorrect')
   }
})

const userRegister = asyncHandler(async (req, res) => {
   const { name, email, password} = req.body;
   const userExists = await User.findOne({ email })
   if(userExists) {
     res.status(400)
     throw new Error('User Alredy Exists')
   } else {
       const user = await User.create({
           name,
           email,
           password
       })
       res.status(201)
       res.send({
         _id: user._id,
         email: user.email,
         name: user.name,
         isAdmin: user.isAdmin,
         token: generateWebToken(user._id),
       })
   }
})

const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)
   if(user) {
      res.send({
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      })
   } else {
       res.status(404)
       throw new Error('User not found')
   }
   
})


const updateUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)
   if(user) {
     user.name = req.body.name || user.name
     user.email = req.body.email || user.email
     if(req.body.password) {
        user.password = req.body.password
     }
    const updatedUser = await user.save()
     res.send({
       _id: updatedUser._id,
       email: updatedUser.email,
       name: updatedUser.name,
       isAdmin: updatedUser.isAdmin,
     })

   } else {
       res.status(404)
       throw new Error('User not found')
   }
   
})


export { userLogin, userRegister, getUserProfile, updateUserProfile } 