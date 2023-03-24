require('dotenv').config()
require('./config/database')
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const logger = require('morgan')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})

app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'build', 'index.html')))


app.use(require('./config/checkToken'))

app.use('/api/users', require('./routes/api/users'))
app.use('/api/songs', require('./routes/api/songs'))
app.use('/api/playlists', require('./routes/api/playlists'))

app.listen(PORT, () => {
    console.log(`I am listening on ${PORT}`)
})
