const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const app = express()

mongoose.connect(config.MONGODB_URI).then(() => {
    logger.info(`MongoDB connected`)
})
.catch(error => logger.error(`${error}`))

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.use('api/blogs',blogRouter)

module.exports = app
