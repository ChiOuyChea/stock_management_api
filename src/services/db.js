require('dotenv').config()

const mongoose = require('mongoose')

const connectDB = async () => {
    const url = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/stock_management'
    try {
        await mongoose.connect(url)   
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connection: ", error.message)
        process.exit(1);
    }
}

module.exports = connectDB