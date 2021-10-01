const express = require('express');
const cors = require('cors');

const data = require('../data');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/api/users', (req, res) => {
  res.status(200).json(data);
});

server.post('/api/register', (req, res) => {
  const {username, password} = req.body;
  if (!username || !password) {
    res.status(400).json({"message":"no username or password"});
  } else {
    data.push({username, password});
    res.status(201).json({"message":`successfully added user ${username}`});
  }
});

server.post('/api/login', (req, res) => {
  const {username, password} = req.body;
  const check = data.filter(
    (user => user.username === username && user.password === password)
  );
  if (check.length > 0) {
    res.status(200).json({"message":`Welcome back ${username}`});
  } else {
    res.status(404).json({"message":"unable to validate user info"});
  }
});

module.exports = server;