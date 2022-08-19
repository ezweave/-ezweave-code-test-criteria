const express = require('express');
const routes = require('./routes');
const enableCors = require('./middlewares');
const app = express();

app.use(enableCors);
app.use('/github_api', routes);
module.exports = app;