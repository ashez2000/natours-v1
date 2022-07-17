const express = require('express')
const morgan = require('morgan')

const errorHandler = require('./middlewares/error.middleware')
const AppError = require('./utils/app-error.utils')
const tours = require('./routes/tour.router')
const auth = require('./routes/auth.router')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/tours', tours)
app.use('/api/v1/auth', auth)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)

module.exports = app
