const {
    getListFavoriteMd,
    addFavoriteMd,
    getDetailFavoriteMd,
    countFavoriteMd,
    updateFavoriteMd,
    deleteFavoriteMd,
} = require('../db/models/favoriteSchema');
import { ArrayObjectId, ObjectId, String, Date, Number, validation } from '../config/joiValid'
import asyncHandler from 'express-async-handler'


export const addFavorite = asyncHandler(async (req, res, next) => {
    const { userId, songId } = req.body || req.params
    const valid = {
        userId: ObjectId.required(),
        songId: ObjectId.required(),
    };

    if (validation(req.body, valid, res)) return;

    let where = { userId, songId }

    const data = await addFavoriteMd(where)

    return res.json({ data, status: true, mess: "Thêm dữ liệu thành công!" })

})
export const getListFavorites = asyncHandler(async (req, res, next) => {


})
export const countFavorites = asyncHandler(async (req, res, next) => {


})
export const getDetailFavorite = asyncHandler(async (req, res, next) => {


})
export const deleteFavorite = asyncHandler(async (req, res, next) => {


})
export const updateFavorite = asyncHandler(async (req, res, next) => {


})





