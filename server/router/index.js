const Router = require('express').Router
const userController = require('../controllers/user-controller')
const {body} = require('express-validator')

const router = new Router()

router.post('/sing-up',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 32}),
  userController.singUp)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)

module.exports = router