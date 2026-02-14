const express = require('express');
const connectDb = require("./config/connectToMongoDB");
const cors = require('cors');
const UserRoutes = require("./routes/User.js");
const HealthRoutes = require("./routes/HealthChecker.js");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDb();

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, from Healthcare System!');
});

// Routes
app.use("/user", UserRoutes);
app.use("/health", HealthRoutes);


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Go to http://localhost:${PORT} to see the application.`);
});