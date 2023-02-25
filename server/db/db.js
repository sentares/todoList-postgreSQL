const { Pool } = require('pg')

const db = new Pool({
	database: 'post' ,
	port: Number(process.env.DB_POST),
	host: process.env.DB_HOST,
	user: 'postgres',
	password: 'qwerty'
})
db.connect(err => {
	if (err) {
		return console.log(`Error db ${err}`)
	}
	console.log('Connect DB')
})

module.exports = db
