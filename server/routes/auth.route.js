const { Router } = require('express')
const AuthController = require('../controllers/auth.controller')

const router = Router()

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/check', AuthController.check)
router.post('/logout')

module.exports = router
