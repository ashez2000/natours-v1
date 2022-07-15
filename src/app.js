const express = require('express')
const morgan = require('morgan')

const errorHandler = require('./middlewares/error.middleware')
const AppError = require('./utils/app-error.utils')
const tours = require('./routes/tour.router')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/tours', tours)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)

module.exports = app
