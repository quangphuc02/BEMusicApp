const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema
const ModelBase = require('../config/ModelBase');
class SongModel extends ModelBase { }


SongModel.init("Song", {
      name: { type: String, },
      by: { type: ObjectId, ref: 'User' },
      season: { type: Array, },
      topic: { type: Array, },
      singer: { type: String },
      composed: { type: String },
      song: { type: String },
      listens: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      deletedAt: { type: Date, default: null },
})

const getListSongMd = (where = {}, page, limit, populates = [], sort = { createdAt: -1 }) => {
      return SongModel.findAll(where, page, limit, populates, sort);
};
const addSongMd = (params) => {
      return SongModel.create(params)
};
const getDetailSongMd = (where = {}) => {
      return SongModel.findItem(where)
}
const countSongMd = (where = {}, page, limit) => {
      return SongModel.count(where, page, limit)
}
const updateSongMd = (where = {}, attr) => {
      return SongModel.findOneAndUpdate(where, attr)
}
const deleteSongMd = (where = {}) => {
      return SongModel.delete(where)
}

module.exports = {
      getListSongMd,
      addSongMd,
      getDetailSongMd,
      countSongMd,
      updateSongMd,
      deleteSongMd,
};