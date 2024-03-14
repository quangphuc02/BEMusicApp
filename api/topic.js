

const TopicController = require("../controller/topicController");
const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/addTopic', TopicController.addTopic)
router.post('/updateTopic', TopicController.updateTopic)
router.post('/deleteTopic', TopicController.deleteTopic)
router.get('/getListTopics', TopicController.getListTopics)
router.get('/getDetailTopic', TopicController.getDetailTopic)
router.get('/countTopics', TopicController.countTopics)

module.exports = router;