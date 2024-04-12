

import {
    addSong,
    updateSong,
    deleteSong,
    getListLent,
    getListTrend,
    getListSacring,
    getListAll,
    getDetailSong,
    countSongs
} from "../controller/songController";
const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/addSong', upload.single('song'), addSong)
router.post('/updateSong', upload.single('song'), updateSong)
router.post('/deleteSong', deleteSong)
router.get('/getListLent', getListLent) // Mùa Chay
router.get('/getListTrend', getListTrend)   // Thịnh hành
router.get('/getListSacring', getListSacring) // Dâng Lễ
router.get('/getListAll', getListAll) // Get All Song
router.get('/getDetailSong', getDetailSong)
router.get('/countSongs', countSongs)

module.exports = router;