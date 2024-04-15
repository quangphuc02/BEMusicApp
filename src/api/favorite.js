import express from "express"
import {
    addFavorite,
    countFavorites,
    deleteFavorite,
    getDetailFavorite,
    getListFavorites,
    updateFavorite
} from "../controller/favoriteController"

const router = express.Router();

router.post('/addFavorite', addFavorite)
router.post('/updateFavorite', updateFavorite)
router.post('/deleteFavorite', deleteFavorite)
router.get('/getListFavorites', getListFavorites)
router.get('/getDetailFavorite', getDetailFavorite)
router.get('/countFavorites', countFavorites)

export default router