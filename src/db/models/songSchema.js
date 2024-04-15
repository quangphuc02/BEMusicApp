import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema
import ModelBase from '../config/ModelBase'
class SongModel extends ModelBase { }


SongModel.init("Song", {
      name: { type: String, },
      by: { type: ObjectId, ref: 'users' },
      topic: [{ type: ObjectId, ref: 'Topic' }],
      singer: { type: String },
      composed: { type: String },
      song: { type: String },
      favorite: { type: Number, default: 0 },
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

export {
      getListSongMd,
      addSongMd,
      getDetailSongMd,
      countSongMd,
      updateSongMd,
      deleteSongMd,
};