const express = require('express');
const { getTopics, createTopic, deleteTopic } = require('../controllers/topic.controller');

const TopicRouter = express.Router();

TopicRouter.get('/', getTopics);

TopicRouter.post('/', createTopic);

TopicRouter.delete('/:id', deleteTopic);

module.exports = TopicRouter;
