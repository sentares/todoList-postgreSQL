const db = require('../db/db')

class PostController {
	async getPost(req, res) {
		try {
			const { id_user } = req.query
			const { rows } = await db.query('select * from posts where id_user = $1', [id_user])

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
	async getSpecialPost(req, res) {
		try {
			const { id_post } = req.params

			if (!id_post) {
				return res.status(400).json({
					message: 'Не указан id поста',
					type: 'error',
					data: []
				})
			}

			const { rows } = await db.query('select * from posts where id_post = $1', [id_post])

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
			const { title, id_user } = req.body

			const { rows } = await db.query(`insert into posts (title, id_user) values ('${title}', ${id_user}) returning id_post`)

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

	async updatePostTitle(req, res) {
		try {
			const { id_post } = req.params
			const { title } = req.body
			await db.query(`update posts set title='${title}' where id_post=${id_post}`)

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
