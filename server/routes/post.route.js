const { Router } = require('express')
const PostController = require('../controllers/post.controller')

const router = Router()

router.get('/', PostController.getPost)
router.get('/special/:id_post', PostController.getSpecialPost)
router.post('/', PostController.createPost)
router.put('/special/:id_post', PostController.updatePostTitle)
router.put('/', PostController.updatePost)
router.delete('/:id_post', PostController.deletePost)

module.exports = router
