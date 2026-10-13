const express = require('express');
const mainRouter = express.Router();
const wallet = require('./wallet');

mainRouter.use('/wallet', wallet);

module.exports = mainRouter;
