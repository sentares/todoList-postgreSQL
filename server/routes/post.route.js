const { Router } = require('express')
const PostController = require('../controllers/post.controller')

const router = Router()

router.get('/', PostController.getPost)
router.post('/', PostController.createPost)
router.put('/', PostController.updatePost)
router.delete('/:id_post', PostController.deletePost)

module.exports = router
