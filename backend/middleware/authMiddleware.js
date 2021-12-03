import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const authUser = asyncHandler( async (req, res, next) => {

   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       try {
           const token = req.headers.authorization.split(' ')[1]
           const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
           req.user = await User.findById(decode.id).select('-password')
            next()
       } catch (error) {
           res.status(401)
          throw new Error('not authorized, token failed')
       }
   } else {
       res.status(401)
     throw new Error('not authorized, no token')
   }
  
})

export default authUser