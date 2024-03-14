const { initializeApp, firebaseConfig } = require('../lib/firebase');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const {
    getListTopicMd,
    addTopicMd,
    getDetailTopicMd,
    countTopicMd,
    updateTopicMd,
    deleteTopicMd,
} = require('../db/models/topicSchema');
const { ArrayObjectId, ObjectId, String, Date, Number, validation } = require('../config/joiValid');
const asyncHandler = require('express-async-handler');


const TopicController = {
    addTopic: asyncHandler(async (req, res, next) => {
        const { name } = req.body
        const valid = {
            name: String.required(),
        };

        if (validation(req.body, valid, res)) return;

        let where = { name }

        const data = await addTopicMd(where)

        return res.json({ data, status: true, mess: "Thêm dữ liệu thành công!" })

    }),
    getListTopics: asyncHandler(async (req, res, next) => {


    }),
    countTopics: asyncHandler(async (req, res, next) => {


    }),
    getDetailTopic: asyncHandler(async (req, res, next) => {


    }),
    deleteTopic: asyncHandler(async (req, res, next) => {


    }),
    updateTopic: asyncHandler(async (req, res, next) => {


    }),

};


module.exports = TopicController;
