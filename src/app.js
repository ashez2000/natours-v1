const express = require('express')
const morgan = require('morgan')
const tours = require('./routes/tour.router')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/tours', tours)

app.get('/', (req, res) => {
  res.send('Hello World')
})

module.exports = app
