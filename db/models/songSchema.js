const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema
const ModelBase = require('../config/ModelBase');


class SongModel extends ModelBase {
      constructor(model) {
            super(model);
      }
}

const songSchema = new mongoose.Schema({
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
}, { timestamps: true });

const SongMd = mongoose.model("Song", songSchema);
const songModel = new SongModel(SongMd);

const getListSongMd = (where = {}, page, limit, populates = [], sort = { createdAt: -1 }) => {
      return songModel.findAll(where, page, limit, populates, sort);
};
const addSongMd = (params) => {
      return songModel.create(params)
};
const getDetailSongMd = (where = {}) => {
      return songModel.findItem(where)
}

module.exports = {
      getListSongMd,
      addSongMd,
      getDetailSongMd
};