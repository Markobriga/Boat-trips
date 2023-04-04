const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); 
app.use(express.static('public'));

// Import all routes
const boats = require('./routes/boat')
const trips = require('./routes/trip')
const auth = require('./routes/auth')
const reservation = require('./routes/reservation')
const payment = require('./routes/payment')


app.use('/api/v1', boats)
app.use('/api/v1', trips)
app.use('/api/v1', auth)
app.use('/api/v1', reservation)
app.use('/api/v1', payment)

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app