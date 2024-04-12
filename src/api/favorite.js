import express from "express"
import {
    addFavorite,
    countFavorites,
    deleteFavorite,
    getDetailFavorite,
    getListFavorites,
    updateFavorite
} from "../controller/favoriteController"
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.post('/addFavorite', asyncHandler, addFavorite)
router.post('/updateFavorite', asyncHandler, updateFavorite)
router.post('/deleteFavorite', asyncHandler, deleteFavorite)
router.get('/getListFavorites', asyncHandler, getListFavorites)
router.get('/getDetailFavorite', asyncHandler, getDetailFavorite)
router.get('/countFavorites', asyncHandler, countFavorites)

export default router