const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookieParser());

// Import all routes
const boats = require('./routes/boat')
const trips = require('./routes/trip')
const auth = require('./routes/auth')


app.use('/api/v1', boats)
app.use('/api/v1', trips)
app.use('/api/v1', auth)

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app