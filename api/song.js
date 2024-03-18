

const songController = require("../controller/songController");
const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/addSong', upload.single('song'), songController.addSong)
router.post('/updateSong', upload.single('song'), songController.updateSong)
router.post('/deleteSong', songController.deleteSong)
router.get('/getListLent', songController.getListLent) // Mùa Chay
router.get('/getListTrend', songController.getListTrend)   // Thịnh hành
router.get('/getListSacring', songController.getListSacring) // Dâng Lễ
router.get('/getDetailSong', songController.getDetailSong)
router.get('/countSongs', songController.countSongs)

module.exports = router;