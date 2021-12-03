import express from 'express'
import { userLogin, userRegister, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import authUser from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/register', userRegister)
router.post('/login', userLogin);
router
  .route('/profile')
  .get(authUser, getUserProfile)
  .put(authUser, updateUserProfile)

export default router