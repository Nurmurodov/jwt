const userService = require('../service/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')

module.exports.singUp = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()))
    }
    const {email, password} = req.body
    const userData = await userService.registration(email, password)
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.status(200).json({
      message: 'success',
      user: userData
    })
  } catch (e) {
    next(e)
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body
    const userData = await userService.login(email, password)
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.status(200).json({
      message: 'success',
      user: userData
    })
  } catch (e) {
    next(e)
  }
}

module.exports.logout = async (req, res, next) => {
  try {
    const {refreshToken} = req.cookies
    const token = await userService.logout(refreshToken)
    res.clearCookie('refreshToken')
    return res.json(token)
  } catch (e) {
    next(e)
  }
}

module.exports.activate = async (req, res, next) => {
  try {
    const activationLink = req.params.link
    await userService.activate(activationLink)
    return res.redirect(process.env.CLIENT_URL)
  } catch (e) {
    next(e)
  }
}

module.exports.refresh = async (req, res, next) => {
  try {
    const {refreshToken} = req.cookies
    const userData = await userService.refresh(refreshToken)
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.status(200).json({
      message: 'success',
      user: userData
    })
  } catch (e) {
    next(e)
  }
}

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers()
    return res.status(200).json(users)
  } catch (e) {
    next(e)
  }
}