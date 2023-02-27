require('dotenv').config()
const http = require('http')
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(logger('dev'))
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true
	})
)

app.use('/api', require('./routes/index'))

const server = http.createServer(app)

server.listen(PORT, () => console.log(`Start server in port ${PORT}`))
