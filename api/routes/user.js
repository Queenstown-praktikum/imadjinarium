const express = require('express');
const { getUsers, createUser } = require('../controllers/user.controller');

const UserRouter = express.Router();

UserRouter.get('/', getUsers);

UserRouter.post('/', createUser);

module.exports = { UserRouter };
