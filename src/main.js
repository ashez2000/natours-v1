const http = require('http')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connection successful!'))

const server = http.createServer(app)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
