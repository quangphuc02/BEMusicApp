const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const port = 8000

dotenv.config()
const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
};

connectToMongo();
app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use("/v1/auth", authRoute)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})