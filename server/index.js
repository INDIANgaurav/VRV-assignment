const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require('./config');
const dotenv = require("dotenv");

const app = express();

const userRoute = require('./routes/userRoutes'); 
 
// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173' ],
    credentials: true,
}));
dotenv.config()
// Connect to Database
connectDb();

// Routes
app.use('/api/users',  userRoute);
 

// Start the Server
const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
