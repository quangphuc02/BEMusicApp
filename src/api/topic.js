

import {
    addTopic,
    countTopics,
    deleteTopic,
    getDetailTopic,
    getListTopics,
    updateTopic
} from "../controller/topicController";

const express = require('express');
const router = express.Router();

router.post('/addTopic', addTopic)
router.post('/updateTopic', updateTopic)
router.post('/deleteTopic', deleteTopic)
router.get('/getListTopics', getListTopics)
router.get('/getDetailTopic', getDetailTopic)
router.get('/countTopics', countTopics)

module.exports = router;