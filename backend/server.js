const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes'); 
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

const corsOptions = {
    origin: 'http://localhost:5173', // Specify the allowed origin
    credentials: true, // Allow credentials (cookies, authentication, etc.)
};


// Middleware
app.use(express.json()); // Body parser
app.use(cors(corsOptions)); // Enable CORS
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes); // User routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
