import { connectToMongo } from "./src/db/config/main"
import express from "express";
import { errHandler, notFound } from "./src/middlewares/errorHandler"
import userApi from './src/api/user'
import songApi from './src/api/song'
import topicApi from './src/api/topic'
import favoriteApi from "./src/api/favorite"
import cors from "cors";
import { collectRequest } from "./src/middlewares/collectRequest"
import dotenv from 'dotenv'

dotenv.config()
const app = express()
connectToMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(collectRequest)
app.use('/user', userApi)
app.use('/song', songApi)
app.use('/topic', topicApi)
app.use('/favorite', favoriteApi)
app.use(notFound)
app.use(errHandler)

app.listen(process.env.PORT || 8000, () => {
    console.log(`TRUY CẬP ĐẾN PORT ${process.env.PORT}`)
})
