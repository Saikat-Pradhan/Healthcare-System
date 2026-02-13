const express = require('express');
const mongoose = require('mongoose');
const connectDb = require("./config/connectToMongoDB");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDb();

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, from Healthcare System!');
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Go to http://localhost:${PORT} to see the application.`);
});