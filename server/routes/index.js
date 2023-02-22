const express = require('express')

const app = express()

app.use('/auth', require('./auth.route'))
app.use('/post', require('./post.route'))

module.exports = app
