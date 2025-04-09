const express = require('express');
const router = express.Router();
const { registerUser,loginUser,logoutUser,getUser,sendBookingEmail } = require('../controllers/user.controller.js');
// Register user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', getUser);
router.post('/send-booking-email', sendBookingEmail);

module.exports = router;
