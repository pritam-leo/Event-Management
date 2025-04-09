const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');




// Register User
const registerUser = async (req, res) =>{
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });
    
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
    
        const newUser = new User({ firstName, lastName, email, phone, password : hashedPassword });
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    
}

// Login User
const loginUser = async (req, res) =>{
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, firstName: user.firstName },
      'your_secret_key', // Change this to an environment variable
      { expiresIn: '2min' } // Token expires in 2min
    );
    // Store token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevent access from JavaScript (secure)
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 2 * 60 * 1000, // 2 min
    });
    // If login is successful
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
};

// Get User Data from Cookie
const getUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ user: null });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    res.json({ user: { id: decoded.id, firstName: decoded.firstName } });
  } catch (error) {
    res.status(401).json({ user: null });
  }
};
 

//Sending Email
const sendBookingEmail = async (req, res) => {
  const { email, phone, date, time, venue, specialRequests,packageName,packageDetails,packagePrice,category } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pritamhalder515@gmail.com',
        pass: 'vkahgvjjjhdanlcz',
      },
    });

    const mailOptions = {
      from: email,
      to: 'pritamhalder515@gmail.com',
      subject: `New Booking Request from ${email}`,

      html: `
        <h2>New Booking Details</h2>
        <p><strong>User Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Package:</strong> ${packageName}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Details:</strong> ${packageDetails}</p>
        <p><strong>Price:</strong> $${packagePrice}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Venue:</strong> ${venue}</p>
        <p><strong>Special Requests:</strong> ${specialRequests}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Booking email sent successfully' });

  } catch (error) {
    console.error('Email sending error:', error.message,error);
    res.status(500).json({ message: 'Failed to send booking email' });
  }
};
  

module.exports = { registerUser ,loginUser,getUser,logoutUser,sendBookingEmail};