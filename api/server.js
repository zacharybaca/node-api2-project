const express = require('express');

const postsRouter = require('../data/posts-router.js');

const Posts = require('../data/db.js');

const server = express();

server.use('/api/posts', postsRouter);

module.exports = server;
