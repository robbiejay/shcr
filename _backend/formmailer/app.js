const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const sendFormRoutes = require('./routes/send-form');
// const matchmakingRoutes = require('./routes/matchmaking');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers',
  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
);
  res.setHeader('Access-Control-Allow-Methods',
  "GET, POST, PATCH, PUT, DELETE, OPTIONS"
);
  next();
});

app.use('/api/send-form', sendFormRoutes);


module.exports = app;
