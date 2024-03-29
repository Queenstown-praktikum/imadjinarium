const { User } = require('../models/index');

const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
};

const createUser = async (req, res) => {
  const { firstName, lastName } = req.body;
  const user = await User.create({ firstName, lastName });
  res.status(200).send(user);
};

module.exports = {
  getUsers,
  createUser,
};
