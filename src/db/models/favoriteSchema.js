import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema
import ModelBase from '../config/ModelBase'

class FavoriteModel extends ModelBase { }


FavoriteModel.init("Favorite", {
    songId: { type: ObjectId, ref: 'Song' },
    userId: { type: ObjectId, ref: 'users' },
    deletedAt: { type: Date, default: null },
})

const getListFavoriteMd = (where = {}, page, limit, populates = [], sort = { createdAt: -1 }) => {
    return FavoriteModel.findAll(where, page, limit, populates, sort);
};
const addFavoriteMd = (params) => {
    return FavoriteModel.create(params)
};
const getDetailFavoriteMd = (where = {}) => {
    return FavoriteModel.findItem(where)
}
const countFavoriteMd = (where = {}, page, limit) => {
    return FavoriteModel.count(where, page, limit)
}
const updateFavoriteMd = (where = {}, attr) => {
    return FavoriteModel.findOneAndUpdate(where, attr)
}
const deleteFavoriteMd = (where = {}) => {
    return FavoriteModel.delete(where)
}

export {
    getListFavoriteMd,
    addFavoriteMd,
    getDetailFavoriteMd,
    countFavoriteMd,
    updateFavoriteMd,
    deleteFavoriteMd,
}