const express = require('express');
const app = express();

app.use(express.json());

// Import all routes
const boats = require('./routes/boat')


app.use('/api/v1', boats)

module.exports = app