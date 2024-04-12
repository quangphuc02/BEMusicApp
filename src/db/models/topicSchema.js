import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema
import ModelBase from '../config/ModelBase'

class TopicModel extends ModelBase { }


TopicModel.init("Topic", {
      name: { type: String, },
      image: { type: String },
      deletedAt: { type: Date, default: null },
})

const getListTopicMd = (where = {}, page, limit, populates = [], sort = { createdAt: -1 }) => {
      return TopicModel.findAll(where, page, limit, populates, sort);
};
const addTopicMd = (params) => {
      return TopicModel.create(params)
};
const getDetailTopicMd = (where = {}) => {
      return TopicModel.findItem(where)
}
const countTopicMd = (where = {}, page, limit) => {
      return TopicModel.count(where, page, limit)
}
const updateTopicMd = (where = {}, attr) => {
      return TopicModel.findOneAndUpdate(where, attr)
}
const deleteTopicMd = (where = {}) => {
      return TopicModel.delete(where)
}

module.exports = {
      getListTopicMd,
      addTopicMd,
      getDetailTopicMd,
      countTopicMd,
      updateTopicMd,
      deleteTopicMd,
};