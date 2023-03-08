const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());

// Import all routes
const boats = require('./routes/boat')


app.use('/api/v1', boats)

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app