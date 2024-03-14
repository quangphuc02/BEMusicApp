const { initializeApp, firebaseConfig } = require('../lib/firebase');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { getListSongMd, addSongMd, getDetailSongMd, countSongMd, updateSongMd, deleteSongMd } = require('../db/models/songSchema');
const { ArrayObjectId, ObjectId, String, Date, Number, validation } = require('../config/joiValid');
const asyncHandler = require('express-async-handler');


const songController = {
    addSong: async (req, res, next) => {
        const { name, by, season, topic, singer, composed } = req.body;

        const valid = {
            name: String.required(),
            by: ObjectId,
            season: ArrayObjectId,
            topic: ArrayObjectId,
            singer: String,
            composed: String,
            listens: Number,
            likes: Number,
        };
        if (validation(req.body, valid, res)) {
            return;
        }

        const params = {
            name, by, season, topic, singer, composed
        }
        if (req.file) {
            initializeApp(firebaseConfig)
            const storage = getStorage()
            const storageRef = ref(storage, `songs/${req.file.originalname}`)
            uploadBytes(storageRef, req.file.buffer).then(() => {
                getDownloadURL(storageRef).then((url) => {
                    if (url) params.song = url
                    const data = addSongMd(params);
                    res.status(200).json({
                        status: true,
                        data,
                        mess: "Thêm bài hát thành công"
                    });
                });
            })
        } else {
            return res.status(400).json({
                status: true,
                data: {},
                mess: "Bài hát không được để trống!"
            });
        }

    },
    getListSongs: asyncHandler(async (req, res, next) => {
        const { page, limit } = req.query;

        const valid = {
            page: Number.required(),
            limit: Number.required()
        };

        if (validation(req.query, valid, res)) {
            return;
        }
        let where = {}

        try {
            const data = await getListSongMd(where, page, limit, [{ path: 'topic', select: 'name' }])
            return res.json({
                data,
                status: true,
                mess: "Lấy dữ liệu thành công"
            })
        } catch (error) {
            console.log(error);
            return res.json({
                data: error,
                status: false,
                mess: "Có lỗi sảy ra "
            })
        }
    }),

    countSongs: async (req, res, next) => {

        const valid = {
            page: Number.required(),
            limit: Number.required()
        };

        if (validation(req.query, valid, res)) {
            return;
        }

        let where = {}

        try {
            const data = await countSongMd(where)
            return res.json({
                data,
                status: true,
                mess: "Lấy dữ liệu thành công"
            })
        } catch (error) {
            return res.json({
                data: {},
                status: false,
                mess: "Có lỗi sảy ra"
            })
        }
    },
    getDetailSong: asyncHandler(async (req, res, next) => {

        const { _id } = req.body
        const valid = {
            _id: ObjectId.required(),
        };

        if (validation(req.body, valid, res)) return;

        let where = { _id }

        const data = await getDetailSongMd(where)
        if (!data) throw new Error("Không tìm thấy bài hát")

        return res.json({ data, status: true, mess: "Lấy dữ liệu thành công" })

    }),
    deleteSong: async (req, res, next) => {
        const { _id } = req.body
        const valid = { _id: ObjectId.required() };
        if (validation(req.body, valid, res)) return;
        let where = { _id }
        try {
            const data = await deleteSongMd(where)
            res.json({ data, status: true, mess: "Xóa dữ liệu thành công" })
        } catch (err) {
            res.json({ data: {}, status: false, mess: "Có lỗi sảy ra" })
        }
    },
    updateSong: async (req, res, next) => {
        const { _id, name, by, season, topic, singer, composed } = req.body;

        const valid = {
            _id: ObjectId.required(),
        };

        if (validation({ _id }, valid, res)) {
            return;
        }

        let where = { _id }
        let params = { name, by, season, topic, singer, composed }

        if (req.file) {
            initializeApp(firebaseConfig)
            const storage = getStorage()
            const storageRef = ref(storage, `songs/${req.file.originalname}`)
            uploadBytes(storageRef, req.file.buffer).then(() => {
                getDownloadURL(storageRef).then(async (url) => {
                    if (url) params.song = url
                    try {
                        const data = await updateSongMd(where, params)
                        return res.json({
                            data,
                            status: true,
                            mess: "Cập nhật dữ liệu thành công"
                        });
                    } catch (error) {
                        return res.json({
                            data: {},
                            status: false,
                            mess: "Có lỗi sảy ra"
                        })
                    }
                });
            })
        }
    }

};


module.exports = songController;
