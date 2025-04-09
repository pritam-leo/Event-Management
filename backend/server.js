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
    origin: "https://eventpro-site.vercel.app", // Specify the allowed origin
    credentials: true, // Allow credentials (cookies, authentication, etc.)
};
app.use(cors(corsOptions)); // Enable CORS

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://eventpro-site.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
  
    next();
  });


// Middleware
app.use(express.json()); // Body parser

app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes); // User routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
