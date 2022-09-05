const { Topic } = require('../models/index');

const getTopics = async (req, res) => {
  const topic = await Topic.findAll();
  res.status(200).send(topic);
};

const createTopic = async (req, res) => {
  const { name, body } = req.body;
  const topic = await Topic.create({ name, body });
  res.status(200).send(topic);
};

const deleteTopic = async (req, res) => {
  const { id } = req.params;
  await Topic.destroy({
    where: {
      id,
    },
  });
  res.sendStatus(200);
};

module.exports = {
  getTopics,
  createTopic,
  deleteTopic,
};
