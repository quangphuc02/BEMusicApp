

const songController = require("../controller/songController");
const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/addSong', upload.single('song'), songController.addSong)
router.get('/getListSongs', songController.getListSongs)
router.get('/getDetailSong', songController.getDetailSong)

module.exports = router;