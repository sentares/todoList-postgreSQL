const { Pool } = require('pg')

const db = new Pool({
	database: 'post',
	port: 5432,
	host: 'localhost',
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
