const mongoose = require("mongoose");
require("dotenv").config();

const MongoDB_Url = process.env.MongoDB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(`${MongoDB_Url}`);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error("Error in MongoDB Connection!!", error);
    }
}

module.exports = connectDB;