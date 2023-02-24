const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../db/db')

class AuthController {
	async login(req, res) {
		try {
			const data = req.body

			const { rows } = await db.query('select * from users where email=$1', [data.email])

			if (!rows.length) {
				return res.status(303).json({
					message: 'Такой пользователь не существует',
					type: 'warn',
					data: {},
					accessToken: ''
				})
			}

			const { name, password, email, id_user } = await rows[0]

			const isPassword = await bcrypt.compare(data.password, password)

			if (!isPassword) {
				return res.status(303).json({
					message: 'Неправильный пароль',
					type: 'warn',
					data: {},
					accessToken: ''
				})
			}

			const token = jwt.sign({ name, email, id_user }, process.env.SECRET_KEY)

			res.status(202)
				.cookie('token', token, { httpOnly: true, maxAge: 100 * 60 * 60 * 24 * 30 })
				.json({
					message: 'Авторизация прошла успешно',
					type: 'success',
					data: { name, email, id_user },
					accessToken: token
				})
		} catch (e) {
			console.log(e)
		}
	}

	async register(req, res) {
		try {
			const { name, password, email } = req.body

			const { rows } = await db.query('select * from users where email=$1', [email])

			if (rows.length) {
				return res.status(303).json({
					message: `Пользователь с такой ${email} эл.почтой уже регистрировон`,
					type: 'warn',
					data: [],
					register: false
				})
			}

			const hashPassword = await bcrypt.hash(password, 12)

			const { rows: arrId } = await db.query('insert into users (email, password, name) values ($1, $2, $3) returning id_user', [email, hashPassword, name])

			if (arrId.length) {
				return res.status(201).json({
					message: 'Вы успешно зарегистированы',
					type: 'success',
					data: [],
					register: true
				})
			}

			return res.status(404).json({
				message: 'Ошибка в регистрации',
				type: 'error',
				data: [],
				register: false
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервер',
				type: 'error',
				data: []
			})
		}
	}

	async check(req, res) {
		try {
			const { token } = req.cookies

			if (!token) {
				return res.status(303).json({
					message: 'Вы не авторизованы',
					type: 'warn',
					data: {},
					accessToken: ''
				})
			}

			const { name, email, id_user } = jwt.verify(token, process.env.SECRET_KEY)

			res.status(202).json({
				message: 'Вы авторизованы',
				type: 'success',
				data: { name, email, id_user },
				accessToken: token
			})
		} catch (e) {
			console.log(e)
		}
	}

	async logout(req, res) {
		try {
			res.status(200).clearCookie('token').json({
				message: 'Вы успешно вышли',
				type: 'success',
				data: {}
			})
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new AuthController()
