const db = require('../db/db')

class PostController {
	async getPost(req, res) {
		try {
			const { rows } = await db.query('select * from posts')

			res.status(200).json({
				message: 'Данные успешно получены',
				type: 'success',
				data: rows
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

	async createPost(req, res) {
		try {
			const { title } = req.body

			const { rows } = await db.query(`insert into posts (title) values ('${title}') returning id_post`)

			if (rows.length) {
				const { id_post } = rows[0]

				return res.status(200).json({
					message: 'Данные успешно сохранены',
					type: 'success',
					data: { id_post }
				})
			}

			res.status(200).json({
				message: 'Данные не удалось сохранить',
				type: 'success',
				data: {}
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

	async updatePost(req, res) {
		try {
			const { id_post, completed } = req.body

			await db.query(`update posts set completed=${!completed} where id_post=${id_post}`)

			res.status(201).json({
				message: 'Данные успешно изменены',
				type: 'success',
				data: []
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

	async deletePost(req, res) {
		try {
			const { id_post } = req.params

			await db.query(`delete from posts where id_post=${id_post}`)

			res.status(200).json({
				message: 'Данные успешно удалены',
				type: 'success',
				data: []
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
}

module.exports = new PostController()
