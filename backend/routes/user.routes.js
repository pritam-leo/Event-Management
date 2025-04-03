const express = require('express');
const router = express.Router();
const { registerUser,loginUser,logoutUser,getUser } = require('../controllers/user.controller.js');
// Register user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', getUser);

module.exports = router;
