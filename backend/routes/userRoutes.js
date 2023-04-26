const express = require('express')
const router = express.Router()
const { userAuthentication, createUser, getCurrentUser, logoutUser, updateUser } = require('../controllers/userController')

router.get('/', getCurrentUser)
router.put('/', updateUser)
router.post('/login', userAuthentication)
router.post('/signup', createUser)
router.get('/logout', logoutUser)

module.exports = router