const {
    getListFavoriteMd,
    addFavoriteMd,
    getDetailFavoriteMd,
    countFavoriteMd,
    updateFavoriteMd,
    deleteFavoriteMd,
} = require('@/db/models');
import { ArrayObjectId, ObjectId, String, Date, Number, validation } from '@/config/joiValid'
import asyncHandler from 'express-async-handler'


export const addFavorite = async (req, res, next) => {
    let { c, p } = req
    let { userId, songId } = p
    const valid = {
        userId: ObjectId.required(),
        songId: ObjectId.required(),
    };
    if (validation(req.body, valid, res)) return;
    let where = { userId, songId }
    const data = await addFavoriteMd(where)

    return res.json({ data, status: true, mess: "Thêm dữ liệu thành công!" })
}

export const getListFavorites = async (req, res, next) => {


}
export const countFavorites = async (req, res, next) => {

}
export const getDetailFavorite = async (req, res, next) => {


}
export const deleteFavorite = async (req, res, next) => {
    let { c, p } = req
    let { userId, songId } = p
    const valid = {
        userId: ObjectId.required(),
        songId: ObjectId.required(),
    };
    if (validation(req.body, valid, res)) return;
    let where = { userId, songId }
    const data = await deleteFavoriteMd(where)

    return res.json({ data, status: true, mess: c.MESS.delete })

}
export const updateFavorite = async (req, res, next) => {


}





